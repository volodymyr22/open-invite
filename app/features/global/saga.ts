import {takeLatest, put} from 'redux-saga/effects';

import {globalTypes} from '@feature/constants';

function* updateUnreadMessage(action: any) {
  try {
    console.log('[unread action]', action);

    yield put({type: globalTypes.UPDATE_UNREAD_MSG, hasUnread: action.unread});
  } catch (ex) {
    console.log('[UPDATING UNREAD MESSAGE]', ex);
  }
}

function* globalSaga() {
  console.log('Global saga');
  yield takeLatest(globalTypes.LISTEN_UNREAD_MSG, updateUnreadMessage);
}

export default globalSaga;
