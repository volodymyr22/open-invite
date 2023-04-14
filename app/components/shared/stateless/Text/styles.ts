import styled from 'styled-components/native';
import {TextProps} from 'react-native';
import {Fonts} from '@app/themes';

const FONT_FAMILY: any = {
  OpenSans: {
    normal: {
      bold: Fonts.OPEN_SANS_BOLD,
      extrabold: Fonts.OPEN_SANS_EXTRA_BOLD,
      regular: Fonts.OPEN_SANS_REGULAR,
      light: Fonts.OPEN_SANS_LIGHT,
      semibold: Fonts.OPEN_SANS_SEMI_BOLD,
    },
    italic: {
      bold: Fonts.OPEN_SANS_BOLD_ITALIC,
      extrabold: Fonts.OPEN_SANS_EXTRA_BOLD_ITALIC,
      regular: Fonts.OPEN_SANS_ITALIC,
      light: Fonts.OPEN_SANS_LIGHT_ITALIC,
      semibold: Fonts.OPEN_SANS_SEMI_BOLD_ITALIC,
    },
  },
  Titillium: {
    normal: {
      bold: Fonts.TITILLIUM_WEB_BOLD,
      extrabold: Fonts.TITILLIUM_WEB_EXTRA_BOLD,
      regular: Fonts.TITILLIUM_WEB_ITALIC,
      light: Fonts.TITILLIUM_WEB_LIGHT,
      semibold: Fonts.TITILLIUM_WEB_SEMI_BOLD,
    },
    italic: {
      bold: Fonts.TITILLIUM_WEB_BOLD_ITALIC,
      extrabold: Fonts.TITILLIUM_WEB_EXTRA_BOLD_ITALIC,
      regular: Fonts.TITILLIUM_WEB_ITALIC,
      light: Fonts.TITILLIUM_WEB_LIGHT_ITALIC,
      semibold: Fonts.TITILLIUM_WEB_SEMI_BOLD_ITALIC,
    },
  },
};

export const TextComp = styled.Text<TextProps>`
  font-family: ${({theme}: any) =>
    FONT_FAMILY[theme.family][theme.fontStyle][theme.weight]};
  color: ${({theme}: any) => theme.color};
  font-size: ${({theme}: any) => theme.size}px;
  text-align: ${({theme}: any) => (theme.center ? 'center' : 'auto')};
  margin-bottom: ${({theme}: any) => theme.bottom}px;
  padding-left: ${({theme}: any) => theme.left}px;
`;
