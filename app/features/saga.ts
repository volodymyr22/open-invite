import {all} from 'redux-saga/effects';

import globalSaga from './global/saga';
import authSaga from './auth/saga';
import eventSaga from './event/saga';
import notificationSaga from './notifications/saga';

function* rootSaga() {
  yield all([globalSaga(), authSaga(), eventSaga(), notificationSaga()]);
}

export default rootSaga;
