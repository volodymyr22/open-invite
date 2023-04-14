import {Images} from '@app/themes';
import {AVAILABILITY} from '@type';

export const AvailabilityTypes = [
  {
    id: AVAILABILITY.AVAILABLE_NOW,
    label: 'Open Now',
  },
  {
    id: AVAILABILITY.AVAILABLE_LATER,
    label: 'Open Later',
  },
  {
    id: AVAILABILITY.NOT_AVAILABLE,
    label: 'Not Open',
  },
];

export const OnMeItems = [
  {
    id: 'drinks',
    label: 'Drinks',
    image: Images.drinks,
  },
  {
    id: 'lunch',
    label: 'Lunch',
    image: Images.lunch,
  },
  {
    id: 'dinner',
    label: 'Dinner',
    image: Images.dinner,
  },
];
