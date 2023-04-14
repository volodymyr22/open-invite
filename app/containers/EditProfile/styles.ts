import styled from 'styled-components/native';
import {Colors, Fonts, Metrics} from '@app/themes';
import {s} from 'react-native-size-matters';
import {StyleSheet, ScrollViewProps} from 'react-native';

export const Page = styled.ScrollView.attrs<ScrollViewProps>({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    paddingHorizontal: s(20),
    paddingVertical: s(20),
  },
})`
  background-color: ${Colors.background};
`;

export const KeyboardAvoiding = styled.KeyboardAvoidingView`
  flex: 1;
`;

export const EditAvatarContainer = styled.View``;

export default StyleSheet.create({
  formContainer: {
    flex: 1,
    paddingBottom: s(30),
  },
  editIcon: {
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
  countryText: {
    fontFamily: Fonts.OPEN_SANS_SEMI_BOLD,
    fontWeight: '600',
    fontSize: s(13.5),
    flex: 1,
  },
  countryContainer: {
    borderRadius: Metrics.BORDER_RADIUS,
  },
  multiSelect: {
    backgroundColor: Colors.background,
    borderColor: Colors.secondaryVariant,
    borderRadius: Metrics.BORDER_RADIUS,
  },
  multiSelectValue: {
    maxWidth: '75%',
  },
  placeholder: {
    color: Colors.secondaryVariant,
  },
});
