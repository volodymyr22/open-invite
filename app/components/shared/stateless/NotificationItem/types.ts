import {AVAILABILITY} from '@component/shared/stateless';
import {TouchableOpacityProps} from 'react-native';

export interface NotificationItemProps extends TouchableOpacityProps {
  id: string;
  imageUrl: string;
  status: AVAILABILITY;
  message: string;
  time: string;
}
