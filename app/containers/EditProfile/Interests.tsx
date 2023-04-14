import React, {useState} from 'react';
import {IndexPath, Layout, Select, SelectItem} from '@ui-kitten/components';
import {findIndex} from 'lodash';

import styles from './styles';
import {Text} from '@app/components/shared/stateless';

const _interests = [
  {name: 'Community Involvement'},
  {name: 'Club Memberships'},
  {name: 'Blogging'},
  {name: 'Sports'},
  {name: 'Art'},
  {name: 'Gaming'},
  {name: 'Traveling'},
  {name: 'Pets'},
  {name: 'Music'},
  {name: 'Reading'},
];

const getIndexOfValues = (val) => {
  const index: any = [];

  val.forEach((_val) => {
    const _i = findIndex(_interests, {name: _val});
    index.push(new IndexPath(_i));
  });

  return index;
};

const CountrySelect: React.FunctionComponent<any> = (props) => {
  const {onChange, value} = props;
  const [selectedIndex, setSelectedIndex] = useState<any>(
    getIndexOfValues(value),
  );

  const valueText = selectedIndex.map((_item) => _interests[_item.row].name);

  return (
    <Layout>
      <Select
        placeholder={() => (
          <Text size={14} left={7} weight="semibold" style={styles.placeholder}>
            Your interests
          </Text>
        )}
        multiSelect={true}
        size="large"
        selectedIndex={selectedIndex}
        value={valueText.join(', ')}
        onSelect={(index: any) => {
          setSelectedIndex(index);
          const _valueArr = index.map((_item) => _interests[_item.row].name);
          onChange(_valueArr);
        }}>
        {_interests.map((_interst, index) => (
          <SelectItem
            key={index}
            title={() => (
              <Text style={styles.countryText}>{_interst.name}</Text>
            )}
          />
        ))}
      </Select>
    </Layout>
  );
};

export default CountrySelect;
