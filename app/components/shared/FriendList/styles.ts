import styled from 'styled-components/native';
import {Colors} from '@app/themes';
import {StyleSheet} from 'react-native';

import {s} from 'react-native-size-matters';

export const EmptyContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Wrapper = styled.View`
  background: ${Colors.background};
`;

export const TabItemWrap = styled.View``;
export const HeaderWrap = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: ${s(40)}px;
  border-bottom-width: 1px;
  border-color: ${Colors.secondaryVariant};
`;
export const ListWrap = styled.View`
  height: 100%;
`;

export const SortContainer = styled.View`
  margin-left: ${s(10)}px;
  flex-direction: row;
  align-items: center;
`;

export const SortSelectedWrap = styled.View`
  flex-direction: row;
  align-items: center;
`;

export default StyleSheet.create({
  tabWidth: {
    width: 250,
  },
});
