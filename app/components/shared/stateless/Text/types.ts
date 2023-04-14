import {TextProps} from 'react-native';

export type FONT_FAMILY = 'OpenSans' | 'Titillium';
export type FONT_WEIGHT =
  | 'bold'
  | 'extrabold'
  | 'regular'
  | 'light'
  | 'semibold';

export type FONT_STYLE = 'normal' | 'italic';

export interface TextCompProps extends TextProps {
  weight?: FONT_WEIGHT;
  family?: FONT_FAMILY;
  fontStyle?: FONT_STYLE;
  color?: string;
  size?: number;
  center?: boolean;
  bottom?: number;
  left?: number;
  style?: any;
}
