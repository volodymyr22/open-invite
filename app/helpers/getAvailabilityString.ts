import moment from 'moment';
import {Event} from '@type';
import {convertMsToDateTime} from '@helpers/time';

const getAvailabilityString = (event: Event | null): string => {
  if (!event) {
    return '';
  }
  const datetime = convertMsToDateTime(event.startTime, event.endTime);

  const date = moment(datetime.start).format('Do MMMM YYYY');
  const from_time = moment(datetime.start).format('LT');
  const to_time = moment(datetime.end).format('LT');

  return `${date} | ${from_time} - ${to_time}`;
};

export default getAvailabilityString;
