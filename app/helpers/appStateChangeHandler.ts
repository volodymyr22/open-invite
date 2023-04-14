import {APP_STATES} from '@config/constants';
import Chat from '@helpers/chat';

export const _handleAppStateChange = async (nextAppState, store) => {
  const user = store.getState().authReducer.user;

  switch (nextAppState) {
    case APP_STATES.INACTIVE:
      if (user) {
        await Chat.goOffline(user.id, false);
      }
      break;
    case APP_STATES.BACKGROUND:
      if (user) {
        await Chat.goOffline(user.id, false);
      }
      break;
    case APP_STATES.ACTIVE:
      if (user) {
        await Chat.goOffline(user.id, true);
      }
      break;
    default:
    //
  }
};
