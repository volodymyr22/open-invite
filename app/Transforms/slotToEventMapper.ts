import {find} from 'lodash';

const slotToEventMapper = (selected, actual) => {
  if (Array.isArray(actual.events)) {
    const finalArr: any = [];
    Object.keys(selected).map((_item: any) => {
      const _event = find(actual.events, (_e) => {
        return `${_e.eventId}` === `${_item}`;
      });
      if (_event) {
        finalArr.push({
          ..._event,
          slotIds: selected[_item].slots.map((_i: any) => _i.slotId).join(','),
        });
      }
    });
    return finalArr;
  }
  return [];
};

export default slotToEventMapper;
