import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import {Text, Row, Icon} from '@app/components/shared/stateless';
import {s} from 'react-native-size-matters';
import {Colors} from '@app/themes';

import {RadioContainer} from './styles';

const RadioGroup: React.FunctionComponent<any> = (props) => {
  const [selectedId, setSelectedId] = useState('');
  const {data, onChange, value} = props;

  useEffect(() => {
    setSelectedId(value);
  }, [value]);

  const selectItem = (id: any) => {
    setSelectedId(id);
    const updateData = data.map((item: any) => ({
      id: item.id,
      value: id === item.id ? true : false,
    }));
    onChange(updateData);
  };

  return (
    <View>
      {data.map((item: any, index: number) => (
        <RadioContainer
          key={index}
          onPress={() => selectItem(item.id)}
          isLast={index + 1 === data.length}>
          <Row align="center" justify="space-between">
            <Text>{item.label}</Text>
            <Icon
              size={s(24)}
              color={Colors.primary}
              name={
                selectedId === item.id
                  ? 'radio-f'
                  : 'checkbox-blank-circle-line'
              }
            />
          </Row>
          {item.description ? (
            <Text size={s(10)} weight="light">
              {item.description}
            </Text>
          ) : null}
        </RadioContainer>
      ))}
    </View>
  );
};

export default RadioGroup;
