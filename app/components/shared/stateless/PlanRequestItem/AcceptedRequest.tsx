import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  NewRequestContainer,
  NewRequestWrapper,
  MeetupTime,
  ActionsWrapper,
  TimeWrap,
} from './styles';
import {Button, Text} from '@component/shared/stateless';
import {Colors} from '@app/themes';

const AcceptedRequest: React.FunctionComponent<any> = (props) => {
  const {name, time, actualData} = props;
  const navigation = useNavigation();
  return (
    <NewRequestContainer>
      <NewRequestWrapper>
        <Text weight="semibold" numberOfLines={1} ellipsizeMode="tail">
          {name}
        </Text>
        <MeetupTime>
          <Text size={12}>Meetup by</Text>
          <TimeWrap>
            <Text
              size={11}
              color={Colors.secondary}
              weight="semibold"
              numberOfLines={2}
              ellipsizeMode="tail">
              {time}
            </Text>
          </TimeWrap>
        </MeetupTime>
      </NewRequestWrapper>
      <ActionsWrapper>
        <Button
          text="Message"
          fillType="outlined"
          size="sm"
          onPress={() => {
            navigation.navigate('IndividualChat', {
              id: actualData.userId,
            });
          }}
        />
      </ActionsWrapper>
    </NewRequestContainer>
  );
};

export default AcceptedRequest;
