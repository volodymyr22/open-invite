import {Platform} from 'react-native';

const Constants: any = {
  STATUS_BAR: Platform.OS === 'ios' ? 'dark-content' : 'light-content',
  KEYBOARD_AVOID: Platform.OS === 'ios' ? 'padding' : 'height',
};

export default Constants;
