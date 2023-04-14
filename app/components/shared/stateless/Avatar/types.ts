import {ViewProps} from 'react-native';

export type AVAILABILITY = 'Available_Now' | 'Offline' | 'Available_Soon';
export type SIZE = 'xsm' | 'sm' | 'md' | 'lg';

export interface AvatarProps extends ViewProps {
  size?: SIZE;
  imageUrl?: any;
  availability?: AVAILABILITY | any;
  isLoading?: boolean;
}
