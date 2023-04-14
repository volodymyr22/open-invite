import {IRootState} from './reducers';

export const getUser = (state: IRootState) => state.authReducer.user;
export const isTryingLogin = (state: IRootState) =>
  state.authReducer.isCallingApi;

export const isTryingLogout = (state: IRootState) =>
  state.authReducer.isFetching;

export const getLocation = (state: IRootState) => state.globalReducer.location;
