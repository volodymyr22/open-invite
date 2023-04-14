export type REQUEST_TIME = 'new_request' | 'accepted' | 'suggested_friend';

export interface ON_ME {
  iconName: string;
  value: string;
}

export interface PlanRequestItemProps {
  id: string;
  avatarUrl: string;
  name: string;
  message: string;
  time: string;
  location: string;
  onme: ON_ME;
  requestType: REQUEST_TIME;
  actualData?: any;
}
