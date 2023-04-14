import {StyleSheet} from 'react-native';
import styled from 'styled-components/native';
import {s} from 'react-native-size-matters';
import {Colors} from '@app/themes';

const STATUS: any = {
  Available_Now: '#00da06',
  Offline: '#ff4646',
  Available_Soon: '#0043ff',
};

const SIZE: any = {
  dimen: {
    xsm: s(30),
    sm: s(40),
    md: s(60),
    lg: s(100),
  },
  availabilityPos: {
    xsm: s(3),
    sm: s(3),
    md: s(3),
    lg: s(9),
  },
};

export const Wrapper = styled.View<any>`
  width: ${({size}) => SIZE.dimen[size]}px;
`;

export const Container = styled.View<any>`
  height: ${({size}) => SIZE.dimen[size]}px;
  width: ${({size}) => SIZE.dimen[size]}px;
  border-radius: ${s(55)}px;
  border-width: ${s(2)}px;
  border-color: ${Colors.secondary};
  background: ${Colors.secondary};
  overflow: hidden;
`;

export const Status = styled.View<any>`
  height: ${s(14)}px;
  width: ${s(14)}px;
  background-color: ${({status}: any) => STATUS[status] || 'blue'};
  border-radius: ${s(7)}px;
  border-width: ${s(2)}px;
  border-color: ${Colors.secondary};
  position: absolute;
  top: ${({size}) => SIZE.availabilityPos[size]}px;
  right: ${({size}) => SIZE.availabilityPos[size]}px;
  z-index: 1;
`;

export const IsLoading = styled.View<any>`
  background: rgba(0, 0, 0, 0.6);
  height: ${({size}) => SIZE.dimen[size]}px;
  width: ${({size}) => SIZE.dimen[size]}px;
  position: absolute;
  justify-content: center;
  align-items: center;
`;

export default StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    borderRadius: 100,
    backgroundColor: Colors.lightBg,
  },
});
