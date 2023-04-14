import {convertMsToDateTime} from '@app/helpers/time';
import moment from 'moment';
import {uniqBy, remove, filter, sortBy} from 'lodash';

export const getEventRequests = (events) => {
  if (Array.isArray(events)) {
    const requestEvents = events.map((_data) => {
      const dateTime = convertMsToDateTime(_data.startTime, _data.endTime);
      const lat = _data ? _data.latitude : _data?.location?.latitude;
      const lng = _data ? _data.longitude : _data?.location?.longitude;

      return {
        id: `${_data.id}`,
        avatarUrl: _data.pictureUrl,
        name: _data.interestedUserName,
        message: _data.message,
        time: moment(dateTime.start).format('L LT'),
        location: {
          latitude: lat,
          longitude: lng,
        },
        onme: _data.eventType,
        requestType: 'new_request',
        actualData: _data,
      };
    });
    return requestEvents;
  }

  return [];
};

export const getEvents = (events, user) => {
  const _eventData: any = {
    today: [],
    upcoming: [],
    past: [],
  };
  if (Array.isArray(events)) {
    events.forEach((_data) => {
      const _uniqueReq: any[] = uniqBy(_data.eventSlots, 'requestId');
      remove(_uniqueReq, {requestId: null});
      remove(_uniqueReq, {acceptedUserId: null});

      const lat = _data.location ? _data?.location?.latitude : _data.latitude;
      const lng = _data.location ? _data?.location?.longitude : _data.longitude;
      const locName = _data.location ? _data?.location?.place : '';

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
              _eventTransformed.endTime =
                _requests[_requests.length - 1].endTime;
            }
          }
          if (_eventTransformed.startTime && _eventTransformed.endTime) {
            const dateTime = convertMsToDateTime(
              _eventTransformed.startTime,
              _eventTransformed.endTime,
            );

            const startTime = moment(dateTime.start);

            const userId =
              user.id === _requests[0].acceptedUserId
                ? _data.createdUserId
                : _requests[0].acceptedUserId;
            const name =
              user.id === _requests[0].acceptedUserId
                ? _data.createdUserName
                : _requests[0].acceptedUserName;

            const avatarUrl =
              user.id === _requests[0].acceptedUserId
                ? _data.createdImageURL
                : _requests[0].acceptedImageURL;

            if (startTime.isSame(moment(), 'day')) {
              _eventData.today.push({
                id: `${_requests[0].requestId}`,
                userId,
                avatarUrl,
                name,
                time: startTime.format('LT'),
                location: {
                  latitude: lat,
                  longitude: lng,
                  locName,
                },
                onme: _data.eventType,
                requestType: 'accepted',
                startTime: dateTime.start,
              });
            } else if (startTime.isAfter(moment(), 'day')) {
              _eventData.upcoming.push({
                id: `${_requests[0].requestId}`,
                userId,
                avatarUrl,
                name,
                time: startTime.format('D MMM LT'),
                location: {
                  latitude: lat,
                  longitude: lng,
                  locName,
                },
                onme: _data.eventType,
                requestType: 'accepted',
                startTime: dateTime.start,
              });
            } else if (startTime.isBefore(moment())) {
              _eventData.past.push({
                id: `${_requests[0].requestId}`,
                userId,
                avatarUrl,
                name,
                time: startTime.format('LT'),
                location: {
                  latitude: lat,
                  longitude: lng,
                  locName,
                },
                onme: _data.eventType,
                requestType: 'accepted',
              });
            }
          }
        });
      }
    });
  }
  return _eventData;
};

export const getFriendSuggestions = (suggestions) => {
  if (Array.isArray(suggestions)) {
    const suggestionsList = suggestions.map((_data) => {
      const lat = _data.location ? _data?.location?.latitude : _data.latitude;
      const lng = _data.location ? _data?.location?.longitude : _data.longitude;
      const locName = _data.location ? _data?.location?.place : '';

      return {
        id: `${_data.id}`,
        avatarUrl: _data.imageURL,
        name: _data.senderUserName,
        message: _data.message,
        location: {
          latitude: lat,
          longitude: lng,
          locName,
        },
        requestType: 'suggested_friend',
        actualData: _data,
      };
    });
    return suggestionsList;
  }

  return [];
};
