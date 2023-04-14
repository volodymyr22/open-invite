import {StyleSheet} from 'react-native';
import styled from 'styled-components/native';
import {s} from 'react-native-size-matters';
import {Colors} from '@app/themes';

export const Page = styled.View`
  flex: 1;
  background: ${Colors.background};
`;

export const HeaderWrap = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const UserStatus = styled.View`
  margin-left: ${s(10)}px;
`;

export default StyleSheet.create({
  avatarMargin: {
    marginTop: s(3),
  },
});
