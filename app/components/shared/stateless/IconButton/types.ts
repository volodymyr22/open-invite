import {ViewStyle, TouchableOpacityProps} from 'react-native';

export type BUTTON_PRESET = 'primary' | 'secondary';
export type BUTTON_TYPE = 'fill' | 'outlined';
export type BUTTON_SIZE = 'sm' | 'md' | 'lg';

export interface ButtonProps extends TouchableOpacityProps {
  preset?: BUTTON_PRESET;
  size?: BUTTON_SIZE;
  fillType?: BUTTON_TYPE;
  style?: ViewStyle;
  iconName: string;
  iconStyles?: {} | [];
}
