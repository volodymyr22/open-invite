import styled from 'styled-components/native';
import {s} from 'react-native-size-matters';
import {StyleSheet} from 'react-native';
import {Colors} from '@app/themes';

export const Page = styled.View`
  flex: 1;
  padding: 0 ${s(40)}px;
  justify-content: center;
  align-items: center;
`;

export const Container = styled.View`
  width: 90%;
  padding: ${s(20)}px;
  background-color: ${Colors.secondary};
  justify-content: center;
  align-items: center;
`;

export const ModalCloser = styled.TouchableOpacity`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
`;

export default StyleSheet.create({
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  buttonSpacing: {
    justifyContent: 'flex-start',
  },
});
