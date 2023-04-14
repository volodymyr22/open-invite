import {filter, sortBy, has} from 'lodash';
import moment from 'moment';
import {convertMsToDateTime} from '@helpers/time';

export const getDateList = (dateList: any[]) => {
  const dates = {};

  dateList.forEach((date) => {
    if (has(date, 'startTime')) {
      const dateTime = convertMsToDateTime(date.startTime, date.startTime);
      const dateFormatted = moment(dateTime.start).format('DD/MM/YYYY');
      if (!dates[dateFormatted]) {
        dates[dateFormatted] = {
          parse: dateTime.start,
          events: [],
        };
      }
      if (!dates[dateFormatted].events) {
        dates[dateFormatted].events = [date];
      } else {
        dates[dateFormatted].events.push(date);
      }
    }
  });

  return Object.keys(dates).map((_date, index) => ({
    id: `${index}`,
    month: moment(dates[_date].parse).format('MMM'),
    date: moment(dates[_date].parse).format('D'),
    day: moment(dates[_date].parse).format('ddd'),
    events: dates[_date].events,
  }));
};

export const hasJoinableEvent = (eventList) => {
  if (!Array.isArray(eventList)) {
    return false;
  }
  const totalEvents = eventList.length;
  const approvedLength = filter(eventList, {status: 'Accepted'}).length;
  return totalEvents === approvedLength
    ? false
    : totalEvents > 0
    ? true
    : false;
};

const isSequential = (data) => {
  let res = true;
  data.forEach((_i, index) => {
    if (index + 1 < data.length) {
      if (data[index + 1] !== _i + 1) {
        res = false;
      }
    }
  });

  return res;
};

export const checkIfSlotOrderIsInSequence = (slots, newSlot = null) => {
  const _temp = [...slots];
  if (newSlot) {
    _temp.push(newSlot);
  }
  const _slots = sortBy(_temp, 'slotOrder').map((_s: any) => _s.slotOrder);
  const result = isSequential(_slots);
  return result;
};

export const getSelectedStartEndTime = (_event) => {
  let arr: any = [];
  Object.keys(_event).map((_key) => {
    const slots = _event[_key];
    arr = [...arr, ...slots.slots];
  });
  arr = sortBy(arr, 'slotOrder');
  let _date: any;
  if (arr.length >= 1) {
    _date = convertMsToDateTime(arr[0].startTime, arr[arr.length - 1].endTime);
  }

  return !_date
    ? '-'
    : moment(_date.start).format('LT') + '-' + moment(_date.end).format('LT');
};
