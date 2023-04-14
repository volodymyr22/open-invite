import styled from 'styled-components/native';
import {s} from 'react-native-size-matters';
import {StyleSheet} from 'react-native';
import {Colors} from '@app/themes';

export const Container = styled.TouchableOpacity<any>`
  flex-direction: row;
  padding: ${s(10)}px ${s(15)}px;
`;
export const Content = styled.View`
  padding-left: ${s(15)}px;
  padding-top: ${s(5)}px;
  flex: 1;
`;

export const RightContent = styled.View`
  padding-left: ${s(7)}px;
  justify-content: space-around;
  max-width: ${s(80)}px;
`;

export default StyleSheet.create({
  unreadContainer: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 10,
  },
});
