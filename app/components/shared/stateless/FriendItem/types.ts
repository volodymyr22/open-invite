import {AVAILABILITY} from '@component/shared/stateless';
import {Friend} from '@type';

export interface FriendItemProps extends Friend {
  size: 'sm' | 'md' | 'lg';
  event_status: AVAILABILITY;
  facebook_id: string;
  id: any;
  mutual_friends_count: number;
  name: string;
  otp_verified: boolean;
  profile_picture: string;
  onPress?: any;
  disabled?: boolean;
  user_privacy_setting?: any;
}
