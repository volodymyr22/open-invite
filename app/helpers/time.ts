import moment from 'moment';

// Convert to UTC - milliseconds
export const convertToMilliseconds = (startTime: string, endTime: string) => {
  const utcTime = convertToUTC(startTime, endTime);

  const startTimestamp = moment(utcTime.start).set('seconds', 0).valueOf();
  const endTimestamp = moment(utcTime.end).set('seconds', 0).valueOf();

  return {
    start: startTimestamp,
    end: endTimestamp,
  };
};

// Convert to UTC - String
export const convertToUTC = (startTime: string, endTime: string) => {
  // Convert to Date Object
  const _startDate = moment(startTime).toDate();
  const _endDate = moment(endTime).toDate();

  // Convert to UTC string
  const _startUTC = _startDate.toUTCString();
  const _endUTC = _endDate.toUTCString();

  return {
    start: _startUTC,
    end: _endUTC,
  };
};

// Convert to ISO - String
export const convertToLocalTime = (startTime: string, endTime: string) => {
  // Convert to Date Object
  const _startDate = moment(startTime).toDate();
  const _endDate = moment(endTime).toDate();

  // Convert to ISO string
  const _startISO = _startDate.toISOString();
  const _endISO = _endDate.toISOString();

  return {
    start: _startISO,
    end: _endISO,
  };
};

// Convert from millisecons to ISO date time
export const convertMsToDateTime = (startTime?: number, endTime?: number) => {
  const _startDate = moment(startTime).format('DD MMM YYYY hh:mm a');
  const _endDate = moment(endTime).format('DD MMM YYYY hh:mm a');

  const isoDateTime = convertToLocalTime(_startDate, _endDate);
  return isoDateTime;
};

export const getTimeRange = (startTime?: number, endTime?: number): string => {
  const localTime = convertMsToDateTime(startTime, endTime);

  const formatedStartTime = moment(localTime.start).format('LT');
  const formatedEndTime = moment(localTime.end).format('LT');

  return `${formatedStartTime} - ${formatedEndTime}`;
};
