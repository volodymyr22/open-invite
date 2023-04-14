import styled from 'styled-components/native';
import {StyleSheet} from 'react-native';
import {Colors} from '@app/themes';
import {s} from 'react-native-size-matters';

export const Container = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`;

export const FriendMarker = styled.View`
  background-color: ${Colors.background};
  width: ${s(250)}px;
  border-radius: ${s(2)}px;
`;

export const MarkerPinContainer = styled.View`
  height: ${s(100)}px;
  align-items: center;
`;
export const CirclePinContainer = styled.View`
  height: ${s(150)}px;
  align-items: center;
`;

export const MarkerText = styled.View`
  background-color: 'rgba(0,0,0,0.7)';
  width: ${s(100)}px;
  height: ${s(35)}px;
  padding: ${s(3)}px ${s(6)}px;
  border-radius: ${s(5)}px;
  margin-bottom: ${s(10)}px;
`;
export const MarkerPointer = styled.View<any>`
  background-color: ${({color}) => color};
  justify-content: center;
  align-items: center;
  width: ${s(40)}px;
  height: ${s(40)}px;
  border-radius: ${s(20)}px;
`;

export const CirclePointer = styled.View<any>`
  background-color: ${({color}) => color};
  opacity: 1;
  justify-content: flex-start;
  align-items: center;
  width: ${s(100)}px;
  height: ${s(100)}px;
  border-radius: ${s(50)}px;
`;

export const MarkerDownArrow = styled.View<any>`
  position: absolute;
  top: ${s(20)}px;
  width: 0;
  height: 0;
  background-color: transparent;
  border-style: solid;
  border-left-width: ${s(20)}px;
  border-right-width: ${s(20)}px;
  border-top-width: ${s(35)}px;
  border-left-color: transparent;
  border-right-color: transparent;
  border-top-color: ${({color}) => color};
`;

export default StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  centerText: {
    textAlign: 'center',
  },
});
