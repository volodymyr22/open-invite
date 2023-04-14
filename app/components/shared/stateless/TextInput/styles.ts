import styled from 'styled-components/native';
import {StyleSheet} from 'react-native';
import {s} from 'react-native-size-matters';
import {Colors, Fonts, Metrics} from '@app/themes';

export const Input = styled.TextInput.attrs({
  placeholderColor: Colors.lightText,
})`
  height: ${s(40)}px;
  width: 100%;
  border: 1px solid ${Colors.secondaryVariant};
  border-radius: ${Metrics.BORDER_RADIUS}px;
  padding-left: ${s(13)}px;
  padding-right: ${s(13)}px;
  font-family: ${Fonts.OPEN_SANS_SEMI_BOLD};
  font-size: ${s(13)}px;
  color: ${Colors.lightBg};
`;

export const TextWrapper = styled.View`
  margin-bottom: ${s(5)}px;
`;

export const TextGroup = styled.View`
  margin-bottom: ${s(10)}px;
`;

export const Error = styled.View`
  padding-left: ${s(5)}px;
`;

export default StyleSheet.create({
  inputText: {
    fontFamily: Fonts.OPEN_SANS_SEMI_BOLD,
    fontWeight: '600',
    fontSize: s(13.5),
    flex: 1,
  },
});
