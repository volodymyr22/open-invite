import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {Text, Avatar, Row} from '@component/shared/stateless';
import moment from 'moment';
import Chat from '@helpers/chat';

import {MessageItemProps} from './types';
import msgStyles, {Container, Content, RightContent} from './styles';
import {Colors} from '@app/themes';

const MessageItem: React.FunctionComponent<MessageItemProps> = (props) => {
  const {
    profile_picture,
    text,
    createdAt,
    unreadCount,
    user,
    userId,
    ...rest
  } = props;

  const [name, setName] = useState(props.name);
  const [profilePicture, setProfile] = useState(profile_picture);

  useEffect(() => {
    if (userId >= 0) {
      Chat.getUserInfo(userId).then((res: any) => {
        setName(res.userInfo.name);
        setProfile(res.userInfo.profile_picture);
      });
    }
  });

  let time =
    typeof createdAt === 'string'
      ? createdAt
      : moment(createdAt).format('DD/MM/YYYY LT');

  time = time === 'Invalid date' ? '' : time;

  return (
    <Container {...rest}>
      <Avatar imageUrl={profilePicture} size="md" />
      <Content>
        <Text
          weight="semibold"
          bottom={5}
          numberOfLines={1}
          ellipsizeMode="tail">
          {name}
        </Text>
        <Text
          size={12}
          fontStyle={!text ? 'italic' : 'normal'}
          bottom={3}
          weight="light"
          numberOfLines={1}
          ellipsizeMode="tail">
          {text || 'No received messages.'}
        </Text>
      </Content>
      <RightContent>
        <Text
          size={12}
          color={Colors.lightText}
          numberOfLines={1}
          ellipsizeMode="tail">
          {time}
        </Text>
        {unreadCount ? (
          <Row justify="flex-end">
            <View style={msgStyles.unreadContainer}>
              <Text size={12} weight="bold" color={Colors.onPrimary}>
                {unreadCount}
              </Text>
            </View>
          </Row>
        ) : null}
      </RightContent>
    </Container>
  );
};

export default MessageItem;
