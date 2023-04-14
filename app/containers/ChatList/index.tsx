/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import LottieView from 'lottie-react-native';
import {RefreshControl, Modal, View} from 'react-native';
import {s} from 'react-native-size-matters';
import {useSelector} from 'react-redux';
import {has} from 'lodash';
import ChatFind from '@app/components/chatFind';

import {
  Page,
  EmptyContainer,
  HeaderWrapper,
  HeaderButton,
  HeaderTitle,
} from './styles';
import {
  MessageItem,
  List,
  Seperator,
  Text,
  Icon,
} from '@app/components/shared/stateless';
import {IRootState} from '@app/features/reducers';
import {Colors, Fonts} from '@app/themes';

import Chat from '@helpers/chat';

const Screen: React.FunctionComponent<any> = (props) => {
  const user: any = useSelector((state: IRootState) => state.authReducer.user);
  const [userList, setUserList] = useState<any[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [messageModalVisible, setMessageModalVisible] = useState(false);

  const getChannels = () => {
    setIsFetching(true);
    Chat.getConversationList(user.id)
      .then((conversationList) => {
        setIsFetching(false);
        conversationList.onSnapshot((snap) => {
          const _docs = snap.docs;
          const _list = Chat.transformMyConversationsListToUIType(_docs);
          setUserList(_list);
        });
      })
      .catch((ex) => {
        setIsFetching(false);
        console.log('[Error getting conversation list]', ex);
      });
  };

  useEffect(() => {
    getChannels();
  }, []);

  const modalHandler = () => {
    setMessageModalVisible(!messageModalVisible);
  };

  return (
    <Page>
      <HeaderWrapper>
        <HeaderTitle>Message</HeaderTitle>
        <HeaderButton onPress={modalHandler}>
          <Icon name="search" size={s(20)} color={Colors.onPrimary} />
        </HeaderButton>
      </HeaderWrapper>
      <List
        refreshControl={
          <RefreshControl refreshing={isFetching} onRefresh={getChannels} />
        }
        ListEmptyComponent={() => (
          <EmptyContainer>
            <LottieView
              source={require('./../../anims/no-chat.json')}
              style={{
                height: s(200),
              }}
              autoPlay
              loop
            />
            <Seperator height={25} />
            <Text weight="semibold" onPress={getChannels}>
              No Messages
            </Text>
          </EmptyContainer>
        )}
        data={userList}
        renderItem={({item}: any) => (
          <MessageItem
            {...item}
            onPress={() => {
              let _id = item.userId;
              if (!(_id >= 0)) {
                if (has(item, 'user._id')) {
                  _id = item.user._id;
                }
              }
              if (_id >= 0) {
                props.navigation.navigate('IndividualChat', {
                  ...item,
                  id: Number(_id),
                });
              }
            }}
          />
        )}
        keyExtractor={(item, index) => `${index}`}
      />
      <Modal
        animationType="slide"
        transparent={false}
        visible={messageModalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        {/* <View style={{flex: 1}}>
          <Text>Hi in msg</Text>
        </View> */}
        <ChatFind goBackHandler={modalHandler} chatUserList={userList} />
      </Modal>
    </Page>
  );
};

export default Screen;
