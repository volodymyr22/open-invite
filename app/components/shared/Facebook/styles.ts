import styled from 'styled-components/native';
import {Colors, Fonts, Metrics} from '@app/themes';
import {s} from 'react-native-size-matters';

export const FacebookButton = styled.View`
  background-color: ${Colors.facebook};
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: ${Metrics.BORDER_RADIUS}px;
  padding: ${s(10)}px;
`;

export const FacebookText = styled.Text`
  color: ${Colors.facebookText};
  font-family: ${Fonts.OPEN_SANS_SEMI_BOLD};
  font-size: ${s(14)}px;
  margin-left: ${s(10)}px;
`;
