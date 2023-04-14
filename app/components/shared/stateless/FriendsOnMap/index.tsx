import React from 'react';
import MapView, {PROVIDER_GOOGLE, Marker, Callout} from 'react-native-maps';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

import FriendItem from '@component/shared/stateless/FriendItem/Variation';

import MarkerPin from './MarkerPin';
import CircleMarker from './CircleMarker';
import styles, {Container, FriendMarker} from './styles';
import mapStyle from './custommap';
import {IRootState} from '@app/features/reducers';

const FriendsOnMap: React.FunctionComponent<any> = (props) => {
  const {friends} = props;
  
  const navigation = useNavigation();
  const _myLocation = useSelector(
    (state: IRootState) => state.globalReducer.location,
  );

  if (!friends) {
    return null;
  }

  const _friends = friends;
  const _region: any = {
    latitudeDelta: 0.1,
    longitudeDelta: 0.111,
  };

  if (_myLocation) {
    _region.latitude = Number(_myLocation.latitude);
    _region.longitude = Number(_myLocation.longitude);
  }

  return (
    <Container>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        customMapStyle={mapStyle}
        zoomEnabled={true}
        zoomControlEnabled={true}
        cacheEnabled={true}
        region={_region}>
        {_friends.map((friend) => {
          if (
            !friend.show_my_location ||
            friend.user_privacy_setting.invisible_mode
          ) {
            return null;
          }

          let latLng: any = null;

          if (Array.isArray(friend.event_data)) {
            if (friend.event_data.length > 0) {
              const loc = friend.event_data[0].location;
              if (loc.latitude && loc.longitude) {
                latLng = {
                  latitude: Number(loc.latitude),
                  longitude: Number(loc.longitude),
                };
              }
            }
          }

          if (!latLng) {
            if (
              friend.latitude === undefined &&
              friend.longitude === undefined
            ) {
              friend.latitude = 0;
              friend.longitude = 0;
            }
            latLng = {
              latitude: Number(friend.latitude),
              longitude: Number(friend.longitude),
            };
          }

          if (latLng) {
            return friend.exact_location ? (
              <Marker
                key={friend.id}
                coordinate={{
                  latitude: Number(latLng.latitude),
                  longitude: Number(latLng.longitude),
                }}>
                <MarkerPin {...friend} />

                <Callout
                  onPress={() => {
                    navigation.navigate('FriendProfile', {
                      ...friend,
                    });
                  }}>
                  <FriendMarker>
                    <FriendItem size="sm" {...friend} />
                  </FriendMarker>
                </Callout>
              </Marker>
            ) : (
              <CircleMarker {...friend} loc={latLng} />
            );
          }
          return null;
        })}
      </MapView>
    </Container>
  );
};

export default FriendsOnMap;
