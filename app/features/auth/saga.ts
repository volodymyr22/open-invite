import {takeLatest, call, put, select, fork} from 'redux-saga/effects';
import auth from '@react-native-firebase/auth';
import messaging from '@react-native-firebase/messaging';
import {LoginManager, AccessToken} from 'react-native-fbsdk';
import Snackbar from 'react-native-snackbar';
import {getUser, getLocation, isTryingLogin} from '@feature/selectors';
import {authTypes, eventTypes} from '@feature/constants';
import {navigate} from '@navigation';
import Location from '@helpers/location';

import {
  loginUser,
  registerUser,
  updateUser,
  verifyOtp,
  getCurrentUser,
} from './service-calls';
import showSnackBar from '@app/components/notifications/snackbar';
import Chat from '@helpers/chat';

function* manageInitialRequests() {
  yield put({type: eventTypes.GET_EVENT});
  yield put({type: eventTypes.GET_EVENT_INFO});
}

function* loginWithSystem(requestData: any) {
  const isTrying = yield select(isTryingLogin);
  if (!isTrying) {
    try {
      yield put({type: authTypes.LOGIN_API_STARTED});
      const userData = yield call(loginUser, requestData);
      yield put({type: authTypes.LOGIN_API_COMPLETED});
      if (userData) {
        yield put({type: authTypes.LOGIN_FINISHED, user: userData.user});
        yield put({type: authTypes.GET_CURRENT_USER});
        yield fork(Chat.createUser, userData.user);
        yield fork(manageInitialRequests);
      }
    } catch (ex) {
      yield put({type: authTypes.LOGIN_ERROR, error: ex});
      yield put({type: authTypes.LOGIN_API_COMPLETED});
      showSnackBar(ex, true);
    }
  }
}

function* loginWithFacebook() {
  try {
    const firebaseAuth = auth();
    yield put({type: authTypes.LOGIN_START});
    const result = yield call(LoginManager.logInWithPermissions, [
      'user_likes',
      'user_friends',
      'public_profile',
      'email',
    ]);

    if (result.isCancelled) {
      yield put({type: authTypes.LOGIN_STOPPED});
      return;
    }

    const data = yield call(AccessToken.getCurrentAccessToken);

    if (!data) {
      throw 'Something went wrong obtaining access token';
    }

    const facebookCredential = auth.FacebookAuthProvider.credential(
      data.accessToken,
    );

    const user = yield call(
      firebaseAuth.signInWithCredential.bind(firebaseAuth),
      facebookCredential,
    );
    yield fork(handleAuthChange, user);
  } catch (ex) {
    showSnackBar(ex.message, true);
    yield put({type: authTypes.LOGIN_ERROR, error: ex});
  }
}

function* logoutUser() {
  try {
    yield put({type: authTypes.LOGOUT_START});
    const user = yield select(getUser);
    if (user) {
      try {
        yield call(Chat.goOffline, user.id, false);
      } catch (ex) {}
    }
    const firebaseAuth = auth();

    yield call(firebaseAuth.signOut.bind(firebaseAuth));
    yield call(LoginManager.logOut);
    yield put({type: authTypes.LOGOUT_FINISHED});
  } catch (ex) {
    showSnackBar(ex.message, true);
    yield put({type: authTypes.LOGOUT_ERROR, error: ex.message});
  }
}

function* handleAuthChange(action: any) {
  if (!action.user) {
    yield put({type: authTypes.LOGOUT_FINISHED});
    return;
  }
  yield put({type: authTypes.LOGIN_START});
  try {
    if (action.user) {
      const fcm = messaging();
      const fcmToken = yield call(fcm.getToken.bind(fcm));
      const data = yield call(AccessToken.getCurrentAccessToken);
      let location = yield select(getLocation);
      console.log('location==', location);
      if (!data) {
        throw 'Something went wrong obtaining access token';
      }

      if (!location) {
        try {
          location = yield call(Location.getCurrentLocation);
        } catch (ex) {
          console.log('[Unable to fetch location]');
        }
      }

      const requestData = {
        cell_phone: null,
        email_id: action.user.email,
        facebook_access_token: data.accessToken,
        facebook_user_id: data.userID,
        fcm_token: fcmToken,
        firebase_id: action.user.uid,
        latitude: location ? Number(location.latitude) : null,
        longitude: location ? Number(location.longitude) : null,
      };

      yield call(loginWithSystem, requestData);
    } else {
      yield put({type: authTypes.LOGOUT_FINISHED});
    }
  } catch (ex) {
    showSnackBar('Unable to login', true);
    yield put({type: authTypes.LOGIN_ERROR, error: ex.message});
    yield put({type: authTypes.LOGOUT_FINISHED});
  }
}

function* handeUserRegister(action: any) {
  yield put({type: authTypes.REGISTER_USER_START});

  try {
    const userData = yield call(registerUser, action.user);

    if (userData) {
      yield put({type: authTypes.REGISTER_USER_FINISHED, user: userData.user});
      navigate('OTP', {});
    }
  } catch (ex) {
    yield put({type: authTypes.REGISTER_USER_ERROR, error: ex.message});
  }
}

function* handeUserUpdate(action: any) {
  console.log('action****=', action);
  yield put({type: authTypes.UPDATE_USER_START});

  try {
    const userData = yield call(updateUser, action);

    if (userData && action.showAlert) {
      Snackbar.show({
        text: 'Profile Updated successfully',
        duration: Snackbar.LENGTH_LONG,
      });
      yield put({type: authTypes.UPDATE_USER_FINISHED, user: userData.user});
    }
  } catch (ex) {
    yield put({type: authTypes.UPDATE_USER_ERROR, error: ex.message});
  }
}

function* handleVerifyOtp(action: any) {
  yield put({type: authTypes.VERIFY_OTP_START});

  try {
    const isOtpVerified = yield call(verifyOtp, action.data);
    if (isOtpVerified) {
      yield put({type: authTypes.VERIFY_OTP_FINISHED});
    } else {
      showSnackBar('Invalid OTP', true);
      yield put({type: authTypes.VERIFY_OTP_ERROR});
    }
  } catch (ex) {
    showSnackBar(ex, true);
    yield put({type: authTypes.VERIFY_OTP_ERROR});
  }
}

function* handleGetCurrentUser(action) {
  yield put({type: authTypes.GET_CURRENT_USER_START});
  try {
    const sort = action._sortBy ? action._sortBy : '';

    const user = yield select(getUser);
    const userResponse = yield call(getCurrentUser, user, sort);

    yield put({
      type: authTypes.GET_CURRENT_USER_FINISHED,
      user: userResponse.user,
      sortedBy: sort,
    });
  } catch (ex) {
    yield put({type: authTypes.GET_CURRENT_USER_ERROR});
  }
}

function* authSaga() {
  yield takeLatest(authTypes.REQUEST_LOGIN, loginWithFacebook);
  yield takeLatest(authTypes.REQUEST_LOGOUT, logoutUser);
  yield takeLatest(authTypes.HANDLE_AUTH_CHANGE, handleAuthChange);
  yield takeLatest(authTypes.REGISTER_USER, handeUserRegister);
  yield takeLatest(authTypes.VERIFY_OTP, handleVerifyOtp);
  yield takeLatest(authTypes.GET_CURRENT_USER, handleGetCurrentUser);
  yield takeLatest(authTypes.UPDATE_USER, handeUserUpdate);
}

export default authSaga;
