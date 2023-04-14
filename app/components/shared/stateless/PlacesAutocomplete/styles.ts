import styled from 'styled-components/native';
import {s} from 'react-native-size-matters';

import {Colors, Metrics, Fonts} from '@app/themes';
import {StyleSheet} from 'react-native';

export const PlacesFieldContainer = styled.View``;

export const PlacesTextBox = styled.View`
  height: ${s(45)}px;
  width: 100%;
  background-color: ${Colors.background};
  border: 1px solid ${Colors.secondaryVariant};
  border-radius: ${Metrics.BORDER_RADIUS}px;
  padding-left: ${s(10)}px;
  padding-right: ${s(10)}px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const LocationContentWrapper = styled.View`
  max-width: 85%;
`;

export default StyleSheet.create({
  container: {},
  textInputContainer: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    paddingRight: 15,
    height: s(50),
    alignItems: 'center',
    borderTopWidth: 0,
  },
  textInput: {
    fontFamily: Fonts.OPEN_SANS_SEMI_BOLD,
    color: Colors.darkText,
    fontSize: s(15),
    height: s(35),
  },
  description: {
    fontFamily: Fonts.OPEN_SANS_SEMI_BOLD,
  },
});
