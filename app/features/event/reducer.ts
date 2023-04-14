import {Event} from '@type';
import types from './constants';

export interface EventState {
  isFetchingEvent: boolean;
  isFetchingEventInfo: boolean;
  hasError: boolean;
  errorMessage: string;
  event: Event;
  eventData: Event[];
  eventStatus: string;
}

const initialState: EventState = {
  isFetchingEvent: false,
  isFetchingEventInfo: false,
  hasError: false,
  errorMessage: '',
  event: {},
  eventData: [],
  eventStatus: '',
};

export default (state: EventState = initialState, action: any): EventState => {
  switch (action.type) {
    case types.GET_EVENT_START: {
      return {
        ...state,
        isFetchingEvent: true,
      };
    }
    case types.GET_EVENT_FINISHED: {
      const {event} = action;
      return {
        ...state,
        isFetchingEvent: false,
        event,
      };
    }
    case types.GET_EVENT_ERROR: {
      const {error} = action;
      return {
        ...state,
        isFetchingEvent: false,
        hasError: true,
        errorMessage: error,
        event: {},
      };
    }

    case types.GET_EVENT_INFO_START: {
      return {
        ...state,
        isFetchingEventInfo: true,
      };
    }
    case types.GET_EVENT_INFO_FINISHED: {
      const {event}: any = action;
      return {
        ...state,
        isFetchingEventInfo: false,
        eventData: event.eventData || [],
        eventStatus: event.eventStatus,
      };
    }
    case types.GET_EVENT_INFO_ERROR: {
      const {error} = action;
      return {
        ...state,
        isFetchingEventInfo: false,
        hasError: true,
        errorMessage: error,
        eventData: [],
        eventStatus: '',
      };
    }

    case types.CREATE_EVENT_START: {
      return {
        ...state,
        isFetchingEvent: true,
      };
    }
    case types.CREATE_EVENT_FINISHED: {
      const {event} = action;
      return {
        ...state,
        isFetchingEvent: false,
        hasError: false,
        errorMessage: '',
        event,
      };
    }
    case types.CREATE_EVENT_ERROR: {
      const {error} = action;
      return {
        ...state,
        isFetchingEvent: false,
        hasError: true,
        errorMessage: error,
      };
    }
    default: {
      return state;
    }
  }
};
