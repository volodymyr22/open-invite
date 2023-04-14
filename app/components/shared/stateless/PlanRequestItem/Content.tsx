import React from 'react';
import {ContentContainer} from './styles';
import {Text, LocationText} from '@component/shared/stateless';
import {capitalize} from '@helpers/text';

const Content: React.FunctionComponent<any> = (props) => {
  const {location, onme} = props;

  const _location = location.locName ? (
    <Text size={11} ellipsizeMode="tail" numberOfLines={1}>
      {location.locName.substr(0, 25) + '...'}
    </Text>
  ) : (
    <LocationText latitude={location.latitude} longitude={location.longitude} />
  );

  return (
    <ContentContainer>
      {location.latitude && location.longitude ? (
        <Text size={11}>Location: {_location}</Text>
      ) : null}
      {onme ? (
        <Text size={11} left={20}>
          On Me:{' '}
          <Text size={11} fontStyle="italic">
            {capitalize(onme)}
          </Text>
        </Text>
      ) : null}
    </ContentContainer>
  );
};

export default Content;
