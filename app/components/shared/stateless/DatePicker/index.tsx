/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {View, Button, Platform, Modal} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

import {Row, Text} from '@component/shared/stateless';
import styles, {
  DateModalContainer,
  PickerWrapper,
  Overlay,
  DateTextBox,
} from './styles';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Colors} from '@app/themes';

const DatePicker: React.FunctionComponent<any> = (props) => {
  const {
    mode = 'datetime',
    onDateChange,
    date,
    maxDate,
    minDate,
    placeholder,
  } = props;
  const [rollerDate, setRollerDate] = useState(
    date ? date : minDate ? minDate : new Date(),
  );

  const [min, setMin] = useState(minDate);
  const [max, setMax] = useState(maxDate);

  const [chosenDate, setDate] = useState(date);
  const [show, setShow] = useState(false);

  useEffect(() => {
    setMin(minDate);
    if (minDate) {
      setRollerDate(minDate);
    }
  }, [minDate]);

  useEffect(() => {
    setMax(maxDate);
  }, [maxDate]);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || chosenDate;
    setShow(Platform.OS === 'ios');
    setRollerDate(currentDate);
  };

  const showMode = (to) => {
    setShow(to);
  };

  const onSetDate = () => {
    setDate(rollerDate);
    onDateChange(rollerDate);
    showMode(false);
  };

  const format = mode === 'time' ? 'LT' : 'DD-MM-YYYY LT';

  const _currentDate = chosenDate ? (
    <Text color={Colors.darkText}>{moment(chosenDate).format(format)}</Text>
  ) : (
    <Text color={Colors.secondaryVariant}>{placeholder}</Text>
  );

  return (
    <>
      <View>
        <TouchableOpacity onPress={() => showMode(true)} activeOpacity={0.9}>
          <DateTextBox>{_currentDate}</DateTextBox>
        </TouchableOpacity>
      </View>
      <Modal transparent visible={show} animationType="fade">
        <DateModalContainer>
          <Overlay onPress={() => setShow(false)} />
          <PickerWrapper>
            <Row justify="space-between" align="center" style={styles.header}>
              <Button title="Cancel" onPress={() => showMode(false)} />
              <Button title="Set" onPress={() => onSetDate()} />
            </Row>
            <DateTimePicker
              testID="dateTimePicker"
              value={rollerDate}
              mode={mode}
              is24Hour={false}
              display="default"
              onChange={onChange}
              maximumDate={max}
              minimumDate={min}
              minuteInterval={30}
              style={styles.pickerStyle}
              textColor={Colors.darkBg}
            />
          </PickerWrapper>
        </DateModalContainer>
      </Modal>
    </>
  );
};

export default DatePicker;
