/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {has} from 'lodash';
import {
  NewRequestContainer,
  FriendSuggestionWrapper,
  UserDetails,
  Message,
} from './styles';
import Text from '../Text';

const FriendSuggestion: React.FunctionComponent<any> = (props) => {
  const {name, message, actualData} = props;
  const navigation = useNavigation();

  let _title = name;

  if (has(actualData, 'suggestedUserName')) {
    _title += ` has suggested ${actualData.suggestedUserName}`;
  }

  return (
    <NewRequestContainer>
      <FriendSuggestionWrapper
        onPress={() =>
          navigation.navigate('FriendProfile', {
            id: actualData.suggestedUserId,
          })
        }>
        <UserDetails>
          <Text
            weight="semibold"
            numberOfLines={2}
            ellipsizeMode="tail"
            style={{maxWidth: '90%'}}>
            {_title}
          </Text>
        </UserDetails>
        {message ? (
          <Message>
            <Text
              size={12}
              weight="light"
              fontStyle="italic"
              numberOfLines={5}
              ellipsizeMode="tail">
              {message}
            </Text>
          </Message>
        ) : null}
      </FriendSuggestionWrapper>
    </NewRequestContainer>
  );
};

export default FriendSuggestion;
