import api from '@api';
import firestore from '@react-native-firebase/firestore';
import {has} from 'lodash';

import {COLLECTION} from '@app/config/constants';
import {User} from '@app/types';

const userRef = firestore().collection(COLLECTION.USERS);

export const loginUser = (request: any) =>
  new Promise(async (resolve, reject) => {
    try {
      console.log('[LOGGING IN USER]', request);
      const result: any = await api.post('/login/facebook', request);
      console.log('[LOGGING IN USER]', result);
      if (!result.ok) {
        if (has(result, 'data.error')) {
          throw result.data.error;
        } else {
          console.log(result);
          throw 'Some error signing in user.';
        }
      }

      resolve(result.data);
    } catch (ex) {
      console.log('[Started API ended]', ex);
      reject(ex);
    }
  });

export const registerUser = (request: any) =>
  new Promise(async (resolve, reject) => {
    try {
      const result: any = await api.post(
        `/login/submit/${request.id}`,
        request,
      );

      if (!result.ok) {
        if (has(result, 'data.error')) {
          throw result.data.error;
        } else {
          throw 'Some error signing in user.';
        }
      }

      resolve(result.data);
    } catch (ex) {
      reject(ex);
    }
  });

export const verifyOtp = (request: any) =>
  new Promise(async (resolve, reject) => {
    try {
      const result: any = await api.post('/otp/otpVerify', request);

      if (!result.ok) {
        if (has(result, 'data.error')) {
          throw result.data.error;
        } else {
          throw 'Some error signing in user.';
        }
      }

      resolve(result.data);
    } catch (ex) {
      reject(ex);
    }
  });

export const getCurrentUser = (request: any, sort = '') =>
  new Promise(async (resolve, reject) => {
    try {
      const result: any = await api.get(`users/${request.id}?sort=${sort}`);

      if (!result.ok) {
        if (has(result, 'data.error')) {
          throw result.data.error;
        } else {
          throw 'Some error getting current user.';
        }
      }

      if (!has(result, 'data.user.user_privacy_setting')) {
        result.data.user = {
          ...result.data.user,
          user_privacy_setting: {
            exact_location: true,
            invisible_mode: false,
            mile_radius: false,
            people_with_similar_interest: false,
            show_my_location: true,
          },
        };
      }

      resolve(result.data);
    } catch (ex) {
      reject(ex);
    }
  });

export const updateUser = (request: any) =>
  new Promise(async (resolve, reject) => {
    try {
      const result: any = await api.put(`users/${request.user.id}`, request);
      if (!result.ok) {
        if (has(result, 'data.error')) {
          throw result.data.error;
        } else {
          throw 'Some error updating user.';
        }
      }

      resolve(result.data);
    } catch (ex) {
      if (typeof ex === 'string') {
        reject({message: ex});
      } else {
        reject(ex);
      }
    }
  });

export const createCollectionForUser = (userData: User | any) =>
  new Promise(async (resolve, reject) => {
    try {
      const _data = {
        userId: userData.id,
        email: userData.email,
        name: userData.name,
        profile_picture: userData.profile_picture,
        isOnline: false,
        last_seen: new Date(),
      };
      await userRef.doc(`${userData.id}`).set(_data);
      resolve();
    } catch (ex) {
      reject(ex);
    }
  });
