import React, {useState, useEffect} from 'react';
import {Modal} from 'react-native';
import {useSelector} from 'react-redux';
import {has} from 'lodash';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {Colors} from '@app/themes';
import {Text, Icon, SafeArea, IconButton} from '@component/shared/stateless';

import {KEYS} from '@config/constants';
import {getReverseGeocodeText} from '@helpers/googlePlaces';

import styles, {
  PlacesFieldContainer,
  PlacesTextBox,
  LocationContentWrapper,
} from './styles';
import {IRootState} from '@app/features/reducers';

const GooglePlacesInput: React.FunctionComponent<any> = (props) => {
  const {onLocationSelected, value = {}, useCurrent} = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [location, setLocation] = useState<string>('');
  const userObj = useSelector((state: IRootState) => state.authReducer.user);

  useEffect(() => {
    if (value.place) {
      setLocation(value.place);
    } else {
      if (!location && useCurrent) {
        getReverseGeocodeText(userObj.latitude, userObj.longitude)
          .then((locationName) => {
            setLocation(locationName);
            const _location = {
              lat: userObj.latitude,
              lng: userObj.longitude,
              name: locationName,
            };
            onLocationSelected(_location);
          })
          .catch((ex) => console.log(ex));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PlacesFieldContainer>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => setIsModalOpen(true)}>
        <PlacesTextBox>
          <LocationContentWrapper>
            {location ? (
              <Text ellipsizeMode="tail" numberOfLines={1}>
                {location}
              </Text>
            ) : (
              <Text color={Colors.secondaryVariant}>
                Please select a location
              </Text>
            )}
          </LocationContentWrapper>
          <Icon name="map-pin-2-line" size={25} color={Colors.primary} />
        </PlacesTextBox>
      </TouchableOpacity>

      <Modal visible={isModalOpen} animationType="slide">
        <SafeArea>
          <GooglePlacesAutocomplete
            placeholder="Search"
            minLength={2}
            autoFocus
            returnKeyType={'search'}
            keyboardAppearance={'light'}
            currentLocation={true}
            currentLocationLabel="Current location"
            listViewDisplayed="auto"
            fetchDetails={true}
            renderDescription={(row: any) => row.description}
            onPress={(data: any, details: any = null) => {
              if (has(details, 'geometry.location')) {
                const _location = {
                  ...details.geometry.location,
                  name: data.description,
                };
                onLocationSelected(_location);
                setLocation(data.description);
                setIsModalOpen(false);
              }
            }}
            getDefaultValue={() => location}
            textInputProps={{}}
            query={{
              key: KEYS.GOOGLE_MAPS,
              language: 'en',
              types: [
                'address',
                'establishment',
                'geocode',
                'cafe',
                'shopping_mall',
                'restaurant',
                'tourist_attraction',
                'city_hall',
                'street_number',
                'route',
                'sublocality',
                'locality',
                'administrative_area_level_3',
                'administrative_area_level_1',
              ],
            }}
            styles={{...styles}}
            nearbyPlacesAPI="GooglePlacesSearch"
            GoogleReverseGeocodingQuery={{
              ...value,
            }}
            GooglePlacesSearchQuery={{
              rankby: 'distance',
              types: [
                'address',
                'establishment',
                'geocode',
                'cafe',
                'shopping_mall',
                'restaurant',
                'tourist_attraction',
                'city_hall',
                'street_number',
                'route',
                'sublocality',
                'locality',
                'administrative_area_level_3',
                'administrative_area_level_1',
              ],
            }}
            GooglePlacesDetailsQuery={{
              fields: 'formatted_address,geometry',
            }}
            filterReverseGeocodingByTypes={[
              'establishment',
              'street_number',
              'route',
              'sublocality',
              'locality',
              'administrative_area_level_3',
              'administrative_area_level_1',
            ]}
            debounce={200}
            renderRightButton={() => (
              <IconButton
                iconName="close-line"
                size="lg"
                onPress={() => setIsModalOpen(false)}
              />
            )}
          />
        </SafeArea>
      </Modal>
    </PlacesFieldContainer>
  );
};

export default GooglePlacesInput;
