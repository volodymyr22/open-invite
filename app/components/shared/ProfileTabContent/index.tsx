import * as React from 'react';

import {Text} from '@component/shared/stateless';
import {Images} from '@app/themes';

import {Item, ItemLeft, ItemRight, Wrapper, ImageWrap} from './styles';

const ProfileTabContent: React.FunctionComponent<any> = (props) => {
  const {location, whatsInMind, interest, events} = props;
  const _interest = Array.isArray(interest) ? interest.join(', ') : '';

  let _location = location;

  if (Array.isArray(events)) {
    if (events.length >= 1) {
      _location = events[0].location.place;
    }
  }

  return (
    <Wrapper>
      <Item>
        <ItemLeft>
          <ImageWrap source={Images.location} />
        </ItemLeft>
        <ItemRight>
          <Text weight="bold">Location</Text>
          {_location ? (
            <Text>{_location}</Text>
          ) : (
            <Text fontStyle="italic">Not available</Text>
          )}
        </ItemRight>
      </Item>
      <Item>
        <ItemLeft>
          <ImageWrap source={Images.mind} />
        </ItemLeft>
        <ItemRight>
          <Text weight="bold">What's on mind?</Text>
          {whatsInMind ? (
            <Text>{whatsInMind}</Text>
          ) : (
            <Text fontStyle="italic">Not available</Text>
          )}
        </ItemRight>
      </Item>
      <Item>
        <ItemLeft>
          <ImageWrap source={Images.interest} />
        </ItemLeft>
        <ItemRight>
          <Text weight="bold">Interest</Text>
          {_interest ? (
            <Text>{_interest}</Text>
          ) : (
            <Text fontStyle="italic">Not available</Text>
          )}
        </ItemRight>
      </Item>
    </Wrapper>
  );
};

export default ProfileTabContent;
