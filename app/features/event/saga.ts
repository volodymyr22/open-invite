import {takeLatest, put, call, select} from 'redux-saga/effects';
import {has} from 'lodash';
import {authTypes, eventTypes} from '@feature/constants';
import {getUser} from '@feature/selectors';
import {
  getEventRequestsData,
  createEventData,
  updateEventData,
  acceptEvent,
  getEventInfoData,
  rejectEvent,
} from './service-calls';

import {convertToMilliseconds} from '@helpers/time';
import showSnackBar from '@component/notifications/snackbar';
import {goBack} from '@navigation';

function* createUserEvent(action: any) {
  try {
    yield put({type: eventTypes.CREATE_EVENT_START});
    let temp = {
      ...action.event,
    };

    if (has(temp, 'startTime') && has(temp, 'endTime')) {
      const newTimestamp = convertToMilliseconds(temp.startTime, temp.endTime);
      temp = {
        ...temp,
        startTime: newTimestamp.start,
        endTime: newTimestamp.end,
      };
    }

    const eventData = yield call(createEventData, temp);
    if (!eventData.successful) {
      showSnackBar(eventData.message, true);
      yield put({
        type: eventTypes.CREATE_EVENT_ERROR,
        error: eventData.message,
      });
    } else {
      yield put({type: eventTypes.CREATE_EVENT_FINISHED});
      yield put({type: authTypes.GET_CURRENT_USER});
      showSnackBar('Status set successfully');
      goBack();
    }
  } catch (ex) {
    const msg = ex.message
      ? ex.message
      : 'Unable to create event at the moment';
    showSnackBar(msg, true);
    yield put({type: eventTypes.CREATE_EVENT_ERROR, error: ex.message});
  }
}

function* updateUserEvent(action: any) {
  try {
    yield put({type: eventTypes.CREATE_EVENT_START});
    let temp = {
      ...action.event,
    };

    if (has(temp, 'startTime') && has(temp, 'endTime')) {
      const newTimestamp = convertToMilliseconds(
        action.event.startTime,
        action.event.endTime,
      );
      temp = {
        ...temp,
        startTime: newTimestamp.start,
        endTime: newTimestamp.end,
      };
    }

    yield call(updateEventData, temp);
    yield put({type: eventTypes.CREATE_EVENT_FINISHED});
    yield put({type: authTypes.GET_CURRENT_USER});
    showSnackBar('Status updated successfully');
    goBack();
  } catch (ex) {
    showSnackBar('Unable to create event at the moment', true);
    yield put({type: eventTypes.CREATE_EVENT_ERROR, error: ex.message});
    goBack();
  }
}

function* getUserRequests() {
  yield put({type: eventTypes.GET_EVENT_START});
  try {
    const user = yield select(getUser);
    const events = yield call(getEventRequestsData, user.id);
    yield put({type: eventTypes.GET_EVENT_FINISHED, event: events});
  } catch (ex) {
    yield put({type: eventTypes.GET_EVENT_ERROR, error: ex.message});
  }
}

function* getEventInfo() {
  yield put({type: eventTypes.GET_EVENT_INFO_START});
  try {
    const user = yield select(getUser);
    const events = yield call(getEventInfoData, user.id);
    yield put({type: eventTypes.GET_EVENT_INFO_FINISHED, event: events});
  } catch (ex) {
    yield put({type: eventTypes.GET_EVENT_INFO_ERROR, error: ex.message});
  }
}

function* rejectUserEvent(action: any) {
  try {
    const data = {
      approvedUserId: action.event.interestedUserId,
      creatorUserId: action.event.creatorId,
      eventId: action.event.eventId,
      responseId: action.event.id,
    };
    const res = yield call(rejectEvent, data);

    if (res.successful) {
      showSnackBar('Join invite has been declined');
      yield put({type: eventTypes.GET_EVENT_INFO});
    }
  } catch (ex) {
    showSnackBar('Error rejecting request', true);
  }
  yield put({type: eventTypes.GET_EVENT});
}

function* acceptUserEvent(action: any) {
  try {
    const data = {
      approvedUserId: action.event.interestedUserId,
      creatorUserId: action.event.creatorId,
      eventId: action.event.eventId,
      responseId: action.event.id,
    };
    const res = yield call(acceptEvent, data);

    if (res.successful) {
      showSnackBar('Join invite has been accepted');
      yield put({type: eventTypes.GET_EVENT_INFO});
    }
  } catch (ex) {
    showSnackBar('Error accepting request', true);
  }
  yield put({type: eventTypes.GET_EVENT});
}

function* eventSaga() {
  yield takeLatest(eventTypes.GET_EVENT, getUserRequests);
  yield takeLatest(eventTypes.GET_EVENT_INFO, getEventInfo);
  yield takeLatest(eventTypes.CREATE_EVENT, createUserEvent);
  yield takeLatest(eventTypes.UPDATE_EVENT, updateUserEvent);
  yield takeLatest(eventTypes.REJECT_EVENT, rejectUserEvent);
  yield takeLatest(eventTypes.ACCEPT_EVENT, acceptUserEvent);
}

export default eventSaga;
