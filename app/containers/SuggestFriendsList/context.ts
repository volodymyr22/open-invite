import {createContext} from 'react';

const Context = createContext<any>({
  receiver: null,
  nearbyFriends: [],
  commonInterestFriends: [],
  manageSelection: (_data) => {},
});
export default Context;
