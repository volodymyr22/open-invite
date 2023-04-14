import {Event} from '@type';

export interface UserPrivacySetting {
  exact_location: boolean;
  facebook_id: string;
  id: any;
  invisible_mode: boolean;
  mile_radius: boolean;
  people_with_similar_interest: boolean;
  show_my_location: boolean;
  user_id: any;
}

export interface Friend {
  distance: any;
  event_status: string;
  facebook_id: string;
  id: any;
  mutual_friends_count: number;
  name: string;
  otp_verified: boolean;
  profile_picture: string;
}

export interface User {
  distance?: number;
  email?: string;
  facebook_id?: string;
  fcm_token?: string;
  firebase_id?: string;
  first_name?: string;
  id?: number;
  last_name?: string;
  name?: string;
  otp_verified?: boolean;
  profile_picture?: string;
  mobile_number?: string;
  event_status?: string;
  country?: string;
  state?: string;
  whats_on_your_mind?: string;
  user_privacy_setting?: UserPrivacySetting;
  friends?: Friend[];
  friends_of_friends?: Friend[];
  friends_with_similar_interest?: Friend[];
  latitude?: string;
  longitude?: string;
  event_data?: Event[];
  interest?: string[];
}
