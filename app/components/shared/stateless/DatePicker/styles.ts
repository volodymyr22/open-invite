import {StyleSheet} from 'react-native';
import styled from 'styled-components/native';
import {s} from 'react-native-size-matters';
import {Colors, Metrics} from '@app/themes';

export const DateTextBox = styled.View`
  height: ${s(45)}px;
  width: 70%;
  background-color: ${Colors.background};
  border: 1px solid ${Colors.secondaryVariant};
  border-radius: ${Metrics.BORDER_RADIUS}px;
  padding-left: ${s(10)}px;
  padding-right: ${s(10)}px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const DateModalContainer = styled.View`
  flex: 1;
  justify-content: flex-end;
  background: rgba(0, 0, 0, 0.5);
`;

export const PickerWrapper = styled.View`
  background: ${Colors.background};
  padding-bottom: ${s(25)}px;
  border-color: ${Colors.secondaryVariant};
  border-top-width: 1px;
`;

export const Overlay = styled.TouchableOpacity`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
`;

export default StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  pickerStyle: {
    height: 350,
  },
});
