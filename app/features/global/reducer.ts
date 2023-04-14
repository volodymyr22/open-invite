import {Location} from '@type';
import types from './constants';

export interface GlobalState {
  shareLinkIsOpen: boolean;
  location: Location | null;
  hasUnreadMessage: boolean;
}

const initialState: GlobalState = {
  shareLinkIsOpen: false,
  location: null,
  hasUnreadMessage: false,
};

export default (
  state: GlobalState = initialState,
  action: any,
): GlobalState => {
  switch (action.type) {
    case types.SHARE_LINK_OPEN: {
      return {
        ...state,
        shareLinkIsOpen: true,
      };
    }
    case types.SHARE_LINK_CLOSE: {
      return {
        ...state,
        shareLinkIsOpen: false,
      };
    }
    case types.UPDATE_LOCATION: {
      const {location} = action;
      console.log('location=', location);
      return {
        ...state,
        location,
      };
    }
    case types.UPDATE_UNREAD_MSG: {
      const {hasUnread} = action;
      return {
        ...state,
        hasUnreadMessage: hasUnread,
      };
    }
    default: {
      return state;
    }
  }
};
