import styled from 'styled-components/native';
import {TouchableOpacityProps, TextProps, StyleSheet} from 'react-native';
import {Colors, Fonts} from '@app/themes';
import {ms, s} from 'react-native-size-matters';

export const PRESETS: any = {
  fill: {
    background: {
      primary: Colors.primary,
      secondary: Colors.secondary,
    },
    textColor: {
      primary: Colors.onPrimary,
      secondary: Colors.onSecondary,
    },
    border: {
      primary: Colors.primary,
      secondary: Colors.secondary,
    },
  },
  outlined: {
    background: {
      primary: Colors.transparent,
      secondary: Colors.transparent,
    },
    textColor: {
      primary: Colors.primary,
      secondary: Colors.secondary,
    },
    border: {
      primary: Colors.primary,
      secondary: Colors.secondary,
    },
  },
  plain: {
    background: {
      primary: Colors.transparent,
      secondary: Colors.transparent,
    },
    textColor: {
      primary: Colors.primary,
      secondary: Colors.secondary,
    },
    border: {
      primary: Colors.transparent,
      secondary: Colors.transparent,
    },
  },
};

export const SIZE: any = {
  containerHeight: {
    sm: ms(34),
    md: ms(40),
    lg: ms(45),
  },
  containerPadding: {
    sm: ms(15),
    md: ms(20),
    lg: ms(25),
  },
  text: {
    sm: ms(14),
    md: ms(16),
    lg: ms(18),
  },
  iconSize: {
    sm: ms(16),
    md: ms(20),
    lg: ms(25),
  },
  borderRadius: {
    sm: ms(3),
    md: ms(3),
    lg: ms(3),
  },
};

export const ButtonContainer = styled.TouchableOpacity.attrs<
  TouchableOpacityProps
>({
  activeOpacity: 0.7,
})`
  height: ${({theme}: any) => SIZE.containerHeight[theme.size]}px;
  border-radius: ${({theme}: any) => SIZE.borderRadius[theme.size]}px;
  border-width: ${s(1)}px;
  border-color: ${({theme}: any) =>
    PRESETS[theme.fillType].border[theme.preset]};
  background-color: ${({theme}: any) =>
    PRESETS[theme.fillType].background[theme.preset]};
  padding: ${({theme}: any) => '0 ' + SIZE.containerPadding[theme.size]}px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const ButtonText = styled.Text<TextProps>`
  color: ${({theme}: any) => PRESETS[theme.fillType].textColor[theme.preset]};
  font-family: ${Fonts.OPEN_SANS_SEMI_BOLD};
  font-size: ${({theme}: any) => SIZE.text[theme.size]}px;
`;

export default StyleSheet.create({
  icon: {
    marginRight: ms(10),
  },
});
