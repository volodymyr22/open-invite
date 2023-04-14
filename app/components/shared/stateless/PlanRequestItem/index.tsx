import React, {useState} from 'react';
import {Avatar, Icon} from '@component/shared/stateless';

import {PlanRequestItemProps} from './types';
import {
  Container,
  Wrapper,
  ItemContainer,
  ItemContent,
  OpenButton,
} from './styles';
import AcceptedRequest from './AcceptedRequest';
import NewRequest from './NewRequest';
import FriendSuggestion from './FriendSuggestion';
import {Colors} from '@app/themes';
import {s} from 'react-native-size-matters';
import Content from './Content';

const PlanRequestItem: React.FunctionComponent<PlanRequestItemProps> = (
  props,
) => {
  const {
    avatarUrl,
    name,
    time,
    message,
    location,
    onme,
    requestType,
    actualData,
  } = props;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Container>
      <ItemContainer>
        <Wrapper>
          <Avatar imageUrl={avatarUrl} size="sm" />
          {requestType === 'accepted' ? (
            <AcceptedRequest name={name} time={time} actualData={actualData} />
          ) : null}
          {requestType === 'new_request' ? (
            <NewRequest
              name={name}
              time={time}
              message={message}
              actualData={actualData}
            />
          ) : null}
          {requestType === 'suggested_friend' ? (
            <FriendSuggestion
              name={name}
              message={message}
              actualData={actualData}
            />
          ) : null}
        </Wrapper>
        {requestType !== 'suggested_friend' ? (
          <OpenButton onPress={() => setIsOpen(isOpen ? false : true)}>
            <Icon name={'arrow-down'} size={s(25)} color={Colors.lightText} />
          </OpenButton>
        ) : null}
      </ItemContainer>
      {isOpen && requestType !== 'suggested_friend' ? (
        <ItemContent>
          <Content location={location} onme={onme} />
        </ItemContent>
      ) : null}
    </Container>
  );
};

export default PlanRequestItem;
