import {TouchableOpacityProps} from 'react-native';

export interface MessageItemProps extends TouchableOpacityProps {
  id: string;
  profile_picture: string;
  name: string;
  text: string;
  createdAt: string;
  unreadCount: number | string;
  user: any;
}
