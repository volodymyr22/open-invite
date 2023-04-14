import React, {useState, useEffect, useRef} from 'react';
import {Switch, View} from 'react-native';

import {
  Row,
  Text,
  Icon,
  Seperator,
  Spacer,
} from '@app/components/shared/stateless';
import {Tooltip} from '@ui-kitten/components';
import {Colors} from '@app/themes';

import {OnMeItems} from './options';
import {s} from 'react-native-size-matters';

import styles, {OnMeImage} from './styles';

export const OnMeTitle = ({onChange, initial}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [switchOn, setSwitchOn] = useState(initial);

  const tooltipMsg: any = (
    <Text size={12} color={Colors.onPrimary}>
      Enabling this means that Drinks or Lunch or Dinner will be on you!
    </Text>
  );
  return (
    <Row align="center" justify="space-between" bottom={5}>
      <Row align="center">
        <Text weight="semibold">On me</Text>
        <Spacer width={25} />
        <Tooltip
          placement="top start"
          style={styles.tooltip}
          anchor={() => (
            <Icon
              name="user-smile"
              color={Colors.primary}
              size={20}
              onPress={() => setIsVisible(true)}
            />
          )}
          visible={isVisible}
          onBackdropPress={() => setIsVisible(false)}>
          {tooltipMsg}
        </Tooltip>
      </Row>
      <Switch
        trackColor={{false: '#767577', true: Colors.primary}}
        thumbColor="#f4f3f4"
        ios_backgroundColor={Colors.onSurface}
        onValueChange={(value) => {
          setSwitchOn(value);
          onChange(value);
        }}
        value={switchOn}
      />
    </Row>
  );
};

const OnMeList: React.FunctionComponent<any> = (props) => {
  const {value, onChange} = props;
  const [selectedItems, setSelectedItems] = useState('');
  const [switchSel, setSwitchSel] = useState(false);

  useEffect(() => {
    if (value) {
      setSwitchSel(true);
    }
    setSelectedItems(value);
  }, [value]);

  const setSelection = (id: any) => {
    if (switchSel) {
      setSelectedItems(id);
      onChange(id);
    }
  };

  const isChecked = (id: any): boolean => {
    return selectedItems === id ? true : false;
  };

  return (
    <View>
      <OnMeTitle
        initial={value ? true : false}
        onChange={(_val) => {
          setSwitchSel(_val);
          if (_val) {
            // TODO
          } else {
            setSelectedItems('');
            setSelection('');
            onChange('');
          }
        }}
      />
      <View>
        {OnMeItems.map((item, index) => (
          <View key={`${index}`}>
            <Row key={`${index}`} justify="space-between" align="center">
              <Row align="center">
                <OnMeImage source={item.image} />
                <Text left={10}>{item.label}</Text>
              </Row>
              <Icon
                size={s(24)}
                color={Colors.primary}
                name={
                  isChecked(item.id) ? 'radio-f' : 'checkbox-blank-circle-line'
                }
                onPress={() => setSelection(item.id)}
              />
            </Row>
            <Seperator key={`${index}pp`} height={10} />
          </View>
        ))}
      </View>
    </View>
  );
};

export default OnMeList;
