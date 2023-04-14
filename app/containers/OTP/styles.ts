import styled from 'styled-components/native';
import {Images, Colors, Fonts} from '@app/themes';
import {s} from 'react-native-size-matters';
import {StyleSheet} from 'react-native';

export const Page = styled.View`
  flex: 1;
  align-items: center;
  background: ${Colors.background};
`;

export const SafeArea = styled.SafeAreaView`
  flex: 1;
`;

export const Container = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    paddingTop: '20%',
    paddingHorizontal: s(30),
  },
})`
  flex: 1;
`;

export const KeyboardAvoiding = styled.KeyboardAvoidingView`
  flex: 1;
`;

export const Banner = styled.Image.attrs({
  source: Images.message,
  resizeMode: 'contain',
})`
  height: ${s(80)}px;
  width: ${s(80)}px;
  align-self: center;
`;
export const Title = styled.Text`
  text-align: center;
  font-family: ${Fonts.OPEN_SANS_BOLD};
  font-size: ${s(15)}px;
`;
export const Description = styled.Text`
  text-align: center;
  font-family: ${Fonts.OPEN_SANS_LIGHT};
  font-size: ${s(12)}px;
`;
export const HelpText = styled.Text`
  text-align: center;
  font-family: ${Fonts.OPEN_SANS_REGULAR};
  font-size: ${s(12)}px;
`;

export default StyleSheet.create({
  otpContainerStyling: {
    width: '80%',
    height: s(45),
    alignSelf: 'center',
  },
  borderStyleBase: {
    width: s(30),
    height: s(45),
  },
  borderStyleHighLighted: {
    borderColor: Colors.primary,
  },
  underlineStyleBase: {
    width: s(30),
    height: s(45),
    borderWidth: 0,
    borderBottomWidth: 2,
    color: Colors.darkText,
    fontFamily: Fonts.OPEN_SANS_BOLD,
  },
  underlineStyleHighLighted: {
    borderColor: Colors.primary,
  },
});
