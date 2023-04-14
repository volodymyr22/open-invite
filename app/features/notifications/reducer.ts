import types from './constants';

export interface NotificationsState {
  isFetching: boolean;
  notifications: any;
  hasError: boolean;
  errorMessage: string;
  notificationsCount: any;
}

const initialState: NotificationsState = {
  isFetching: false,
  notifications: null,
  notificationsCount: null,
  hasError: false,
  errorMessage: '',
};

export default (
  state: NotificationsState = initialState,
  action: any,
): NotificationsState => {
  switch (action.type) {
    case types.GET_NOTIFICATIONS_START: {
      return {
        ...state,
        isFetching: true,
      };
    }
    case types.GET_NOTIFICATIONS_FINISHED: {
      const {notifications} = action;
      return {
        ...state,
        isFetching: false,
        notifications,
        hasError: false,
        errorMessage: '',
      };
    }
    case types.GET_NOTIFICATIONS_ERROR: {
      const {error} = action;
      return {
        ...state,
        isFetching: false,
        hasError: true,
        errorMessage: error,
      };
    }

    case types.GET_NOTIFICATIONS_COUNT_START: {
      return {
        ...state,
      };
    }
    case types.GET_NOTIFICATIONS_COUNT_FINISHED: {
      const {notifications} = action;
      return {
        ...state,
        notificationsCount: notifications,
      };
    }
    case types.GET_NOTIFICATIONS_COUNT_ERROR: {
      return {
        ...state,
      };
    }
    default: {
      return state;
    }
  }
};
