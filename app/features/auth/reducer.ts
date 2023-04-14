import types from './constants';
import {User} from '@type';

export interface AuthState {
  loggedIn: boolean;
  isFetching: boolean;
  hasError: boolean;
  errorMessage: string;
  sortedBy: string;
  isCallingApi: boolean;
  user: User;
}

const initialState: AuthState = {
  loggedIn: false,
  isFetching: false,
  isCallingApi: false,
  hasError: false,
  errorMessage: '',
  sortedBy: '',
  user: {},
};

export default (state: AuthState = initialState, action: any): AuthState => {
  switch (action.type) {
    case types.LOGIN_API_STARTED: {
      return {
        ...state,
        isCallingApi: true,
      };
    }
    case types.LOGIN_API_COMPLETED: {
      return {
        ...state,
        isCallingApi: false,
      };
    }
    case types.LOGIN_START: {
      return {
        ...state,
        isFetching: true,
      };
    }
    case types.LOGIN_STOPPED: {
      return {
        ...state,
        isFetching: false,
        loggedIn: false,
        user: {},
      };
    }
    case types.LOGIN_FINISHED: {
      const {user} = action;
      return {
        ...state,
        isFetching: false,
        loggedIn: true,
        hasError: false,
        errorMessage: '',
        user,
      };
    }
    case types.LOGIN_ERROR: {
      const {error} = action;
      return {
        ...state,
        isFetching: false,
        loggedIn: false,
        hasError: true,
        user: {},
        errorMessage: error,
      };
    }
    case types.LOGOUT_START: {
      return {
        ...state,
        isFetching: true,
      };
    }
    case types.LOGOUT_FINISHED: {
      console.log('[on logout]');
      return {
        ...initialState,
        isFetching: false,
        loggedIn: false,
        user: {},
      };
    }
    case types.LOGOUT_ERROR: {
      const {error} = action;
      return {
        ...state,
        isFetching: false,
        loggedIn: true,
        hasError: true,
        errorMessage: error,
      };
    }
    case types.REGISTER_USER_START: {
      return {
        ...state,
        isFetching: true,
      };
    }
    case types.REGISTER_USER_ERROR: {
      const {error} = action;
      return {
        ...state,
        isFetching: false,
        hasError: true,
        errorMessage: error,
      };
    }
    case types.REGISTER_USER_FINISHED: {
      const {user} = action;
    
      return {
        ...state,
        isFetching: false,
        hasError: false,
        errorMessage: '',
        user,
      };
    }
    case types.VERIFY_OTP_START: {
      return {
        ...state,
        isFetching: true,
      };
    }
    case types.VERIFY_OTP_FINISHED: {
      return {
        ...state,
        isFetching: false,
        hasError: false,
        errorMessage: '',
        user: {
          ...state.user,
          otp_verified: true,
        },
      };
    }
    case types.VERIFY_OTP_ERROR: {
      const {error} = action;
      return {
        ...state,
        isFetching: false,
        hasError: true,
        errorMessage: error,
      };
    }
    case types.GET_CURRENT_USER_START: {
      return {
        ...state,
        isFetching: true,
      };
    }
    case types.GET_CURRENT_USER_FINISHED: {
      const {user, sortedBy = ''} = action;
      
      return {
        ...state,
        isFetching: false,
        hasError: false,
        errorMessage: '',
        sortedBy,
        user,
      };
    }
    case types.GET_CURRENT_USER_START: {
      const {error} = action;
      return {
        ...state,
        isFetching: false,
        hasError: true,
        errorMessage: error,
      };
    }
    case types.UPDATE_USER_START: {
      return {
        ...state,
        isFetching: true,
      };
    }
    case types.UPDATE_USER_ERROR: {
      const {error} = action;
      return {
        ...state,
        isFetching: false,
        hasError: true,
        errorMessage: error,
      };
    }
    case types.UPDATE_USER_FINISHED: {
      const {user} = action;
      
      return {
        ...state,
        isFetching: false,
        hasError: false,
        errorMessage: '',
        user,
      };
    }
    default: {
      return state;
    }
  }
};
