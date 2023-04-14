import {combineReducers} from 'redux';

import authReducer, {AuthState} from './auth/reducer';
import globalReducer, {GlobalState} from './global/reducer';
import eventReducer, {EventState} from './event/reducer';
import notificationReducer, {NotificationsState} from './notifications/reducer';

export interface IRootState {
  readonly authReducer: AuthState;
  readonly globalReducer: GlobalState;
  readonly eventReducer: EventState;
  readonly notificationReducer: NotificationsState;
}

export default combineReducers<IRootState>({
  authReducer,
  globalReducer,
  eventReducer,
  notificationReducer,
});
