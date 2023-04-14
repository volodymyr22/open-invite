import {TextStyle, ViewStyle, TouchableOpacityProps} from 'react-native';

export type BUTTON_PRESET = 'primary' | 'secondary';
export type BUTTON_TYPE = 'fill' | 'outlined' | 'plain';
export type BUTTON_SIZE = 'sm' | 'md' | 'lg';

export interface ButtonProps extends TouchableOpacityProps {
  preset?: BUTTON_PRESET;
  size?: BUTTON_SIZE;
  fillType?: BUTTON_TYPE;
  textStyle?: TextStyle;
  style?: ViewStyle;
  iconName?: string;
  iconStyles?: {} | [];
  text: string;
}
