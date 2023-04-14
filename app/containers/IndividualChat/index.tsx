/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {GiftedChat} from 'react-native-gifted-chat';
import {has} from 'lodash';
import moment from 'moment';

import styles, {Page, HeaderWrap, UserStatus} from './styles';
import {useNavigation} from '@react-navigation/native';
import {Avatar, BackBtn, Text} from '@app/components/shared/stateless';
import {Colors} from '@app/themes';
import {useSelector} from 'react-redux';
import {IRootState} from '@app/features/reducers';
import Api from '@api';

import Chat from '@helpers/chat';

const getLastSeen = (t) => {
  const date = new firestore.Timestamp(t.seconds, t.nanoseconds);
  const _dateTime = moment(date.toDate()).format('DD/MM/YYYY HH:MM');
  return `Last Seen on ${_dateTime}`;
};

const Screen: React.FunctionComponent<any> = (props) => {
  const {route} = props;
  const navigation = useNavigation();
  const [userData, setUserData] = useState<any>(null); // User data on firebase
  const user: any = useSelector((state: IRootState) => state.authReducer.user);

  const [messages, setMessages] = useState<any>([]);

  useEffect(() => {
    if (route.params.id >= 0) {
      Chat.getUserInfo(route.params.id)
        .then((res: any) => {
          setUserData(res);
        })
        .catch((ex) => console.log(ex));
      const convId = Chat.createConversationId(user.id, route.params.id);
      Chat.listenToMessagesOnChannel(convId).onSnapshot((doc) => {
        const _messages = Chat.transformMyMessageToUIType(doc);
        setMessages(_messages);
        Chat.setAsRead(user.id, route.params.id)
          .then(() => console.log('All messages set to read'))
          .catch((ex) => console.log('[Unable to update read count]', ex));
      });
    } else {
      props.navigation.goBack();
    }
  }, []);

  useEffect(() => {
    if (!has(route, 'params.id')) {
      props.navigation.goBack();
    }
  }, [route.params]);

  useEffect(() => {
    setNavigations();
  }, [userData]);

  const onSendMessageInformFriend = (message) => {
    const body = {
      message: message.text,
      notificationType: 'CHAT',
      profile_picture: user.profile_picture,
      receiverUserId: route.params.id,
      senderUserId: user.id,
      title: `Message by ${user.name}`,
      viewed: false,
    };
    Api.post('/notification/sendChat', body)
      .then((res: any) => {
        console.log(res);
      })
      .catch((ex) => console.log('[Error notifying message]', ex));
  };

  const setNavigations = () => {
    navigation.setOptions({
      headerLeft: () => (
        <HeaderWrap>
          <BackBtn color={Colors.onPrimary} />
          {userData ? (
            <>
              <Avatar
                size="xsm"
                style={styles.avatarMargin}
                imageUrl={
                  userData.userInfo ? userData.userInfo.profile_picture : ''
                }
              />
              <UserStatus>
                <Text weight="semibold" color={Colors.onPrimary}>
                  {userData.userInfo ? userData.userInfo.name : ''}
                </Text>
                <Text color={Colors.onPrimary} size={11}>
                  {userData.isOnline
                    ? 'Online'
                    : userData.last_seen
                    ? getLastSeen(userData.last_seen)
                    : ''}
                </Text>
              </UserStatus>
            </>
          ) : null}
        </HeaderWrap>
      ),
    });
  };

  const onSend = async (chat) => {
    try {
      const convId = Chat.createConversationId(user.id, route.params.id);
      await Chat.sendMessage(convId, user.id, route.params.id, chat[0]);
      onSendMessageInformFriend(chat[0]);
    } catch (ex) {
      console.log('[message] - error', ex);
    }
  };

  const _userObj = {
    _id: user.id,
    name: user.name,
    avatar: user.profile_picture,
  };

  return (
    <Page>
      <GiftedChat
        showUserAvatar={false}
        messages={messages}
        onSend={onSend}
        user={_userObj}
      />
    </Page>
  );
};

export default Screen;
