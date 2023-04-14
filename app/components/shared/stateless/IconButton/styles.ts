import styled from 'styled-components/native';
import {TouchableOpacityProps} from 'react-native';
import {Colors} from '@app/themes';
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
};

export const SIZE: any = {
  containerHeight: {
    sm: ms(32),
    md: ms(34),
    lg: ms(40),
  },
  containerPadding: {
    sm: ms(20),
    md: ms(25),
    lg: ms(30),
  },
  text: {
    sm: ms(12),
    md: ms(14),
    lg: ms(14),
  },
  iconSize: {
    sm: ms(15),
    md: ms(20),
    lg: ms(25),
  },
  borderRadius: {
    sm: ms(16),
    md: ms(17),
    lg: ms(20),
  },
};

export const ButtonContainer = styled.TouchableOpacity.attrs<
  TouchableOpacityProps
>({
  activeOpacity: 0.7,
})`
  height: ${({theme}: any) => SIZE.containerHeight[theme.size]}px;
  width: ${({theme}: any) => SIZE.containerHeight[theme.size]}px;
  border-radius: ${({theme}: any) => SIZE.borderRadius[theme.size]}px;
  border-width: ${s(1)}px;
  border-color: ${({theme}: any) =>
    PRESETS[theme.fillType].border[theme.preset]};
  background-color: ${({theme}: any) =>
    PRESETS[theme.fillType].background[theme.preset]};
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
