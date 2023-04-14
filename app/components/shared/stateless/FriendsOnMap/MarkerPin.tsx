import React from 'react';
import {Text, Avatar} from '@component/shared/stateless';
import styles, {
  MarkerPinContainer,
  MarkerPointer,
  MarkerText,
  MarkerDownArrow,
} from './styles';
import {Colors} from '@app/themes';

const status = {
  Available_Now: 'green',
  Available_Soon: Colors.primary,
  Offline: Colors.red,
};

const MarkerPin: React.FunctionComponent<any> = (props) => {
  const {name, distance = 0, profile_picture, event_status, noPoint} = props;
  const color = status[event_status] || Colors.red;

  return (
    <MarkerPinContainer>
      <MarkerText>
        <Text
          size={10}
          weight="semibold"
          numberOfLines={1}
          ellipsizeMode="tail"
          color={Colors.onPrimary}
          style={styles.centerText}>
          {name}
        </Text>
        {noPoint ? (
          <Text
            size={10}
            weight="semibold"
            style={styles.centerText}
            color={Colors.onPrimary}>
            Around 1 mile radius
          </Text>
        ) : (
          <Text
            size={10}
            weight="semibold"
            style={styles.centerText}
            color={Colors.onPrimary}>
            {distance} miles
          </Text>
        )}
      </MarkerText>
      <MarkerPointer color={color}>
        {!noPoint ? <MarkerDownArrow color={color} /> : null}

        <Avatar imageUrl={profile_picture} size="xsm" />
      </MarkerPointer>
    </MarkerPinContainer>
  );
};

export default MarkerPin;
