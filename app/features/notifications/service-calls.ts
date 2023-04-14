import api from '@api';
import {has} from 'lodash';

export const getNotificationsData = (userId) =>
  new Promise(async (resolve, reject) => {
    try {
      const result: any = await api.get(
        `/notification/getNotificationInfo/${userId}`,
      );
      
      if (!result.ok) {
        if (has(result, 'data.error')) {
          throw result.data.error;
        } else {
          throw 'Some error getting user notifications.';
        }
      }

      resolve(result.data);
    } catch (ex) {
      reject(ex);
    }
  });

export const getNotificationsCountData = (userId) =>
  new Promise(async (resolve, reject) => {
    try {
      const result: any = await api.get(
        `/notification/getNotificationCount/${userId}`,
      );

      if (!result.ok) {
        if (has(result, 'data.error')) {
          throw result.data.error;
        } else {
          throw 'Some error getting user notifications count.';
        }
      }

      resolve(result.data);
    } catch (ex) {
      reject(ex);
    }
  });

export const updateNotification = (notificationId) =>
  new Promise(async (resolve, reject) => {
    try {
      const result: any = await api.put(
        `/notification/update?notificationId=${notificationId}`,
      );

      if (!result.ok) {
        if (has(result, 'data.error')) {
          throw result.data.error;
        } else {
          throw 'Some error updating notification.';
        }
      }

      resolve(result.data);
    } catch (ex) {
      reject(ex);
    }
  });

export const setAllNotificationsToRead = (userId) =>
  new Promise(async (resolve, reject) => {
    try {
      const result: any = await api.put(`/notification/update/user/${userId}`);

      if (!result.ok) {
        if (has(result, 'data.error')) {
          throw result.data.error;
        } else {
          throw 'Some error updating notification.';
        }
      }

      resolve(result.data);
    } catch (ex) {
      reject(ex);
    }
  });
