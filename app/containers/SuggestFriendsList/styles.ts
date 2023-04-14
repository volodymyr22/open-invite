import styled from 'styled-components/native';
import {s} from 'react-native-size-matters';
import {Colors} from '@app/themes';

export const Page = styled.View`
  flex: 1;
  background: ${Colors.background};
`;

export const SelectionContainer = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8,
})`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background: ${Colors.background};
  padding-right: ${s(15)}px;
`;

export const ProfileContainer = styled.View`
  width: 75%;
`;
