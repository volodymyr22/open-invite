import moment from 'moment';
import {getTimeRange, convertMsToDateTime} from '@app/helpers/time';
import {uniqBy, remove, filter, sortBy} from 'lodash';

export const getTodaysEvents = (data: any[], userId: any): any[] => {
  const todaysEvents: any = [];

  data.forEach((_data) => {
    const _uniqueReq: any[] = uniqBy(_data.eventSlots, 'requestId');
    remove(_uniqueReq, {requestId: null});
    remove(_uniqueReq, {acceptedUserId: null});

    if (Array.isArray(_uniqueReq)) {
      _uniqueReq.forEach((_req: any) => {
        const _requests = sortBy(
          filter(_data.eventSlots, {
            requestId: _req.requestId,
          }),
          'slotOrder',
        );
        const _eventTransformed: any = {};
        if (Array.isArray(_requests)) {
          if (_requests.length === 1) {
            _eventTransformed.startTime = _requests[0].startTime;
            _eventTransformed.endTime = _requests[0].endTime;
          } else if (_requests.length > 1) {
            _eventTransformed.startTime = _requests[0].startTime;
            _eventTransformed.endTime = _requests[_requests.length - 1].endTime;
          }
        }
        if (_eventTransformed.startTime && _eventTransformed.endTime) {
          const dateTime = convertMsToDateTime(
            _eventTransformed.startTime,
            _eventTransformed.endTime,
          );

          const startTime: any = moment(dateTime.start);
          const endTime: any = moment(dateTime.end);

          const name =
            userId === _requests[0].acceptedUserId
              ? _data.createdUserName
              : _requests[0].acceptedUserName;

          if (startTime.isSame(moment(), 'day')) {
            todaysEvents.push({
              id: `${_requests[0].requestId}`,
              time: getTimeRange(startTime, endTime),
              description: `Meetup with ${name}`,
              startTime: dateTime.start,
            });
          }
        }
      });
    }
  });

  return todaysEvents;
};

export const getUpcomingEvents = (data: any[], userId: any): any[] => {
  const upcomingEvents: any = [];

  data.forEach((_data) => {
    const _uniqueReq: any[] = uniqBy(_data.eventSlots, 'requestId');
    remove(_uniqueReq, {requestId: null});
    remove(_uniqueReq, {acceptedUserId: null});

    if (Array.isArray(_uniqueReq)) {
      _uniqueReq.forEach((_req: any) => {
        const _requests = sortBy(
          filter(_data.eventSlots, {
            requestId: _req.requestId,
          }),
          'slotOrder',
        );
        const _eventTransformed: any = {};
        if (Array.isArray(_requests)) {
          if (_requests.length === 1) {
            _eventTransformed.startTime = _requests[0].startTime;
            _eventTransformed.endTime = _requests[0].endTime;
          } else if (_requests.length > 1) {
            _eventTransformed.startTime = _requests[0].startTime;
            _eventTransformed.endTime = _requests[_requests.length - 1].endTime;
          }
        }
        if (_eventTransformed.startTime && _eventTransformed.endTime) {
          const dateTime = convertMsToDateTime(
            _eventTransformed.startTime,
            _eventTransformed.endTime,
          );

          const startTime: any = moment(dateTime.start);
          const endTime: any = moment(dateTime.end);

          const name =
            userId === _requests[0].acceptedUserId
              ? _data.createdUserName
              : _requests[0].acceptedUserName;

          if (startTime.isAfter(moment(), 'day')) {
            upcomingEvents.push({
              id: `${_requests[0].requestId}`,
              time: getTimeRange(startTime, endTime),
              description: `Meetup with ${name}`,
              startTime: dateTime.start,
            });
          }
        }
      });
    }
  });

  return upcomingEvents;
};
