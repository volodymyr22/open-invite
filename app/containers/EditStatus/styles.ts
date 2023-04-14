import styled from 'styled-components/native';
import {Colors, Metrics, Fonts} from '@app/themes';
import {s} from 'react-native-size-matters';
import {StyleSheet, ScrollViewProps} from 'react-native';

export const Page = styled.ScrollView.attrs<ScrollViewProps>({
  keyboardShouldPersistTaps: 'always',
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    paddingHorizontal: s(12.5),
    paddingVertical: s(20),
  },
})`
  background-color: ${Colors.background};
`;

export const KeyboardAvoiding = styled.KeyboardAvoidingView`
  flex: 1;
`;

export const AccordionContainer = styled.View`
  margin-bottom: ${s(10)}px;
  border-bottom-width: 1px;
  border-color: ${Colors.secondaryVariant};
`;

export const AccordionHeader = styled.TouchableOpacity.attrs({
  activeOpacity: 0.9,
})`
  padding: ${s(15)}px 0;
`;

export const OnMeImage = styled.Image.attrs({
  resizeMode: 'contain',
})`
  height: ${s(25)}px;
  width: ${s(25)}px;
`;

export const AccordionContent = styled.View`
  flex: 1;
  background-color: ${Colors.surface};
  padding: ${s(15)}px ${s(10)}px;
  border-top-width: 1px;
  border-color: ${Colors.secondaryVariant};
`;

export default StyleSheet.create({
  formContainer: {
    flex: 1,
    paddingBottom: s(30),
  },
  datePickerStyle: {
    width: '75%',
  },
  dateInput: {
    height: s(45),
    borderRadius: Metrics.BORDER_RADIUS,
    backgroundColor: Colors.background,
    borderColor: Colors.secondaryVariant,
  },
  dateText: {
    textAlign: 'left',
    width: '100%',
    paddingHorizontal: s(10),
    fontFamily: Fonts.OPEN_SANS_REGULAR,
    fontSize: s(14),
  },
  placeholderText: {
    textAlign: 'left',
    width: '100%',
    paddingHorizontal: s(10),
    fontFamily: Fonts.OPEN_SANS_REGULAR,
    color: Colors.secondaryVariant,
    fontSize: s(14),
  },
  tooltip: {
    maxWidth: 250,
  },
});
