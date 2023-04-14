/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useRef} from 'react';
import {find} from 'lodash';
import {Autocomplete, AutocompleteItem} from '@ui-kitten/components';
import locationData from 'country-state-city';

import {Text} from '@component/shared/stateless';
import styles from './styles';

const countryList: any = locationData.getAllCountries();

const getStateList = (countryName) => {
  const countryObj = find(countryList, {name: countryName});
  if (countryObj) {
    return locationData.getStatesOfCountry(countryObj.id);
  } else {
    return [];
  }
};

const filter = (item, query) =>
  item.name.toLowerCase().includes(query.toLowerCase());

const CountrySelect: React.FunctionComponent<any> = (props) => {
  const {country, onChange} = props;
  const stateList = useRef<any>([]);
  const [value, setValue] = React.useState(props.value);
  const [data, setData] = React.useState<any>([]);

  useEffect(() => {
    stateList.current = getStateList(country);
    setData(stateList.current);
  }, [country]);

  const onSelect = (index) => {
    setValue(data[index].name);
    onChange(data[index].name);
  };

  const onChangeText = (query) => {
    setValue(query);
    setData(stateList.current.filter((item) => filter(item, query)));
  };

  const renderOption = (item, index) => (
    <AutocompleteItem key={index}>
      <Text size={14} weight="semibold">
        {item.name}
      </Text>
    </AutocompleteItem>
  );

  return (
    <Autocomplete
      placeholder="State"
      value={value}
      onSelect={onSelect}
      onChangeText={onChangeText}
      style={styles.countryContainer}
      textStyle={styles.countryText}
      size="large">
      {data.map(renderOption)}
    </Autocomplete>
  );
};

export default CountrySelect;
