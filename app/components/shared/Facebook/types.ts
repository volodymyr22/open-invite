import {TouchableOpacityProps} from 'react-native';

export interface FacebookProps extends TouchableOpacityProps {
  onLoginSuccess?: (userCred: any) => void;
  onLoginFailed?: (ex: any) => void;
}
