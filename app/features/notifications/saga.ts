import {takeLatest, select, put, call} from 'redux-saga/effects';

import {notificationsTypes} from '@feature/constants';
import {getUser} from '@feature/selectors';

import {
  getNotificationsData,
  getNotificationsCountData,
  setAllNotificationsToRead,
} from './service-calls';

function* getNotifications() {
  yield put({type: notificationsTypes.GET_NOTIFICATIONS_START});

  try {
    const user = yield select(getUser);
    const notifications = yield call(getNotificationsData, user.id);
    yield put({
      type: notificationsTypes.GET_NOTIFICATIONS_FINISHED,
      notifications: notifications.notificationData,
    });
  } catch (ex) {
    yield put({
      type: notificationsTypes.GET_NOTIFICATIONS_ERROR,
      error: ex.message,
    });
  }
}

function* getNotificationsCount() {
  yield put({type: notificationsTypes.GET_NOTIFICATIONS_COUNT_START});

  try {
    const user = yield select(getUser);
    const notifications = yield call(getNotificationsCountData, user.id);

    yield put({
      type: notificationsTypes.GET_NOTIFICATIONS_COUNT_FINISHED,
      notifications: notifications,
    });
  } catch (ex) {
    yield put({
      type: notificationsTypes.GET_NOTIFICATIONS_COUNT_ERROR,
      error: ex.message,
    });
  }
}

function* setNotificationsToRead() {
  try {
    console.log('Setting all notifications to read');
    const user = yield select(getUser);
    yield call(setAllNotificationsToRead, user.id);
    yield put({
      type: notificationsTypes.GET_NOTIFICATIONS_COUNT,
    });
    yield put({
      type: notificationsTypes.GET_NOTIFICATIONS,
    });
  } catch (ex) {
    console.log('Unable to set all to read');
  }
}

function* notificationSaga() {
  yield takeLatest(notificationsTypes.GET_NOTIFICATIONS, getNotifications);
  yield takeLatest(
    notificationsTypes.GET_NOTIFICATIONS_COUNT,
    getNotificationsCount,
  );
  yield takeLatest(
    notificationsTypes.SET_NOTIFICATION_TO_READ,
    setNotificationsToRead,
  );
}

export default notificationSaga;
