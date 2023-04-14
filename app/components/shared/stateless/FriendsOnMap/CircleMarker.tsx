/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useRef} from 'react';
import {Marker, Callout, Circle} from 'react-native-maps';
import {useNavigation} from '@react-navigation/native';
import {computeDestinationPoint} from 'geolib';

import {FriendMarker} from './styles';

import FriendItem from '@component/shared/stateless/FriendItem/Variation';

import MarkerPin from './MarkerPin';

const status = {
  Available_Now: 'rgba(0, 255, 0, 0.4)',
  Available_Soon: 'rgba(46, 156, 255, 0.4)',
  Offline: 'rgba(238, 0, 0, 0.4)',
};

const MILE = 1609.34; // 1 mile to meters

const CircleMarker: React.FunctionComponent<any> = (props) => {
  const {loc, event_status, id} = props;

  const ref = useRef<any>();
  const color = status[event_status] || status.Offline;
  const navigation = useNavigation();

  useEffect(() => {
    if (ref.current) {
      ref.current.setNativeProps({fillColor: color, strokeColor: color});

      console.log(ref.current);
    }
  });

  let pos = {
    latitude: Number(loc.latitude),
    longitude: Number(loc.longitude),
  };

  const markerPos = computeDestinationPoint(
    {
      latitude: Number(loc.latitude),
      longitude: Number(loc.longitude),
    },
    1500,
    180,
  );

  if (markerPos) {
    pos = {
      latitude: markerPos.latitude,
      longitude: markerPos.longitude,
    };
  }

  return (
    <>
      <Marker
        key={id}
        anchor={{x: 0.5, y: 0.7}}
        coordinate={{
          latitude: pos.latitude,
          longitude: pos.longitude,
        }}>
        <MarkerPin {...props} noPoint />

        <Callout
          onPress={() => {
            navigation.navigate('FriendProfile', {
              ...props,
            });
          }}>
          <FriendMarker>
            <FriendItem size="sm" {...props} />
          </FriendMarker>
        </Callout>
      </Marker>
      <Circle
        ref={ref}
        center={{
          latitude: Number(loc.latitude),
          longitude: Number(loc.longitude),
        }}
        radius={MILE}
        fillColor={color}
        strokeColor={color}
      />
    </>
  );
};

export default CircleMarker;
