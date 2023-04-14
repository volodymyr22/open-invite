import React from 'react';
import {Autocomplete, AutocompleteItem} from '@ui-kitten/components';
import locationData from 'country-state-city';

import {Text} from '@component/shared/stateless';
import styles from './styles';

const countryList: any = locationData.getAllCountries();

const filter = (item, query) =>
  item.name.toLowerCase().includes(query.toLowerCase());

const CountrySelect: React.FunctionComponent<any> = (props) => {
  const {onChange} = props;
  const [value, setValue] = React.useState(props.value);
  const [data, setData] = React.useState(countryList);

  const onSelect = (index) => {
    setValue(data[index].name);
    onChange(data[index].name);
  };

  const onChangeText = (query) => {
    setValue(query);
    setData(countryList.filter((item) => filter(item, query)));
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
      placeholder="Country"
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
