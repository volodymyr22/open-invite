import styled from 'styled-components/native';
import {s} from 'react-native-size-matters';
import {Colors, Fonts} from '@app/themes';

export const Page = styled.View`
  flex: 1;
  padding: ${s(10)}px;
  background: ${Colors.background};
`;

export const Item = styled.View`
  width: 100%;
  padding: ${s(15)}px ${s(20)}px;
  flex: 1;
`;

export const ItemText = styled.Text`
  font-family: ${Fonts.OPEN_SANS_REGULAR};
  font-size: ${s(14)}px;
`;

export const ListSeperator = styled.View`
  width: 100%;
  height: 1px;
  background-color: ${Colors.secondaryVariant};
`;
