/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {Text} from '@component/shared/stateless';
import {getReverseGeocodeText} from '@helpers/googlePlaces';

const LocationText: React.FunctionComponent<any> = (props) => {
  const {latitude, longitude} = props;
  const [locationText, setLocationText] = useState('');

  const parseText = async () => {
    setLocationText('...');
    const _loc = await getReverseGeocodeText(latitude, longitude);
    setLocationText(_loc);
  };

  useEffect(() => {
    parseText();
  }, [latitude, longitude]);

  return locationText ? (
    <Text size={11} ellipsizeMode="tail" numberOfLines={1}>
      {locationText.substr(0, 25) + '...'}
    </Text>
  ) : null;
};

export default LocationText;
