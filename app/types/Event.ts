import {Location} from './Location';

export enum AVAILABILITY {
  AVAILABLE_NOW = 'Available_Now',
  AVAILABLE_LATER = 'Available_Soon',
  NOT_AVAILABLE = 'Offline',
}

export interface Event {
  acceptedUserId?: number;
  acceptedUserName?: string;
  availabilityStatus?: string;
  available?: boolean;
  availableSoon?: boolean;
  createdUserFacebookId?: string;
  createdUserId?: number;
  createdUserName?: string;
  endTime?: number;
  eventCreatedSuccessfully?: boolean;
  eventId?: number;
  eventType?: string;
  fireBaseId?: string;
  location?: Location;
  startTime?: number;
  status?: string;
}
