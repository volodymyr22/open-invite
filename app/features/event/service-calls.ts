import api from '@api';
import {has} from 'lodash';
import {Event} from '@app/types';

export const getEventRequestsData = (userId) =>
  new Promise(async (resolve, reject) => {
    try {
      const result: any = await api.get(`/event/plan/requests/${userId}`);
      if (!result.ok) {
        if (has(result, 'data.error')) {
          throw result.data.error;
        } else {
          throw 'Some error getting user events requests.';
        }
      }

      resolve(result.data);
    } catch (ex) {
      reject(ex);
    }
  });

export const getEventInfoData = (userId) =>
  new Promise(async (resolve, reject) => {
    try {
      const result: any = await api.get(`/event/getEventInfo/${userId}`);
      if (!result.ok) {
        if (has(result, 'data.error')) {
          throw result.data.error;
        } else {
          throw 'Some error getting user events requests.';
        }
      }

      resolve(result.data);
    } catch (ex) {
      reject(ex);
    }
  });

export const createEventData = (event: Event) =>
  new Promise(async (resolve, reject) => {
    try {
      const result: any = await api.post('/event/create', event);

      if (!result.ok) {
        if (has(result, 'data.error')) {
          throw result.data.error;
        } else if (has(result, 'data')) {
          if (Array.isArray(result.data) && result.data.length > 0) {
            throw result.data[0];
          }
        } else {
          throw 'Some error creating event.';
        }
      }

      resolve(result.data);
    } catch (ex) {
      console.log(ex);
      reject(ex);
    }
  });

export const updateEventData = (event: Event) =>
  new Promise(async (resolve, reject) => {
    try {
      console.log('in create Event data..');
      const result: any = await api.post('/event/update', event);
      if (!result.ok) {
        if (has(result, 'data.error')) {
          throw result.data.error;
        } else {
          throw 'Some error updating event.';
        }
      }

      resolve(result.data);
    } catch (ex) {
      console.log(ex);
      reject(ex);
    }
  });

export const acceptEvent = (event: Event) =>
  new Promise(async (resolve, reject) => {
    try {
      const result: any = await api.post('/event/approve-event', event);
     
      if (!result.ok) {
        if (has(result, 'data.error')) {
          throw result.data.error;
        } else {
          throw 'Some error updating event.';
        }
      }

      resolve(result.data);
    } catch (ex) {
      console.log(ex);
      reject(ex);
    }
  });

export const rejectEvent = (event: Event) =>
  new Promise(async (resolve, reject) => {
    try {
      const result: any = await api.post('/event/reject-event', event);

      if (!result.ok) {
        if (has(result, 'data.error')) {
          throw result.data.error;
        } else {
          throw 'Some error updating event.';
        }
      }

      resolve(result.data);
    } catch (ex) {
      console.log(ex);
      reject(ex);
    }
  });
