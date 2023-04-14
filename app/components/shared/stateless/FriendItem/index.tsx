/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {has} from 'lodash';
import {Text, Avatar} from '@component/shared/stateless';
import {useNavigation} from '@react-navigation/native';

import {FriendItemProps} from './types';
import {Container, Content} from './styles';

const getStatusText = (status) => {
  if (status === 'Offline') {
    return 'Not Available';
  }
  return status ? status.replace('_', ' ') : status;
};

const FriendItem: React.FunctionComponent<FriendItemProps> = (props) => {
  const {
    size = 'md',
    profile_picture,
    name,
    event_status,
    mutual_friends_count,
    onPress,
    distance,
    disabled = false,
  } = props;

  const navigation = useNavigation();

  const _onPress = onPress
    ? onPress
    : () => {
        navigation.navigate('FriendProfile', {
          ...props,
        });
      };

  if (has(props, 'user_privacy_setting.invisible_mode')) {
    if (props.user_privacy_setting.invisible_mode) {
      return null;
    }
  }

  return (
    <Container disabled={disabled} onPress={_onPress}>
      <Avatar
        imageUrl={profile_picture}
        size={size}
        availability={event_status}
      />
      <Content>
        {name ? (
          <Text
            weight="semibold"
            numberOfLines={1}
            ellipsizeMode="tail"
            style={{maxWidth: '90%'}}>
            {name}
          </Text>
        ) : null}
        {!event_status ? null : (
          <Text
            size={12}
            bottom={3}
            ellipsizeMode="tail"
            numberOfLines={size === 'sm' ? 1 : 5}>
            {getStatusText(event_status)}
          </Text>
        )}
        {mutual_friends_count ? (
          <Text weight="light" fontStyle="italic" size={10}>
            {mutual_friends_count} mutual friends
          </Text>
        ) : null}

        <Text weight="light" fontStyle="italic" size={10}>
          {distance < 1 ? 'less than a mile' : `${distance} miles away`}
        </Text>
      </Content>
    </Container>
  );
};

export default FriendItem;
