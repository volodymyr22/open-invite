/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import moment from 'moment';
import {useDispatch} from 'react-redux';
import {
  NewRequestContainer,
  NewRequestWrapper,
  UserDetails,
  Message,
  ActionsWrapper,
} from './styles';
import Text from '../Text';
import IconButton from '../IconButton';
import {View} from 'react-native';
import {eventTypes} from '@feature/constants';
import {Colors} from '@app/themes';

const NewRequest: React.FunctionComponent<any> = (props) => {
  const {name, time, message, actualData} = props;
  const dispatch = useDispatch();

  const onRejectRequest = () => {
    dispatch({type: eventTypes.REJECT_EVENT, event: actualData});
  };
  const onAcceptRequest = () => {
    dispatch({type: eventTypes.ACCEPT_EVENT, event: actualData});
  };

  return (
    <NewRequestContainer>
      <NewRequestWrapper>
        <UserDetails>
          <Text
            weight="semibold"
            numberOfLines={1}
            ellipsizeMode="tail"
            style={{maxWidth: '90%'}}>
            {name}
          </Text>
          <Text size={10} color={Colors.lightText}>
            {moment(time).format('LL')} {moment(time).format('LT')}
          </Text>
        </UserDetails>
        {message ? (
          <Message>
            <Text size={12} weight="light" fontStyle="italic">
              {message}
            </Text>
          </Message>
        ) : null}
      </NewRequestWrapper>
      <ActionsWrapper>
        <IconButton
          iconName="close-line"
          fillType="outlined"
          onPress={onRejectRequest}
        />
        <View style={{width: 15}} />
        <IconButton
          iconName="check-line"
          fillType="outlined"
          onPress={onAcceptRequest}
        />
      </ActionsWrapper>
    </NewRequestContainer>
  );
};

export default NewRequest;
