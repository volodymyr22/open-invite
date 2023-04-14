import styled from 'styled-components/native';

import {s} from 'react-native-size-matters';
import {StyleSheet, Dimensions} from 'react-native';
import {Colors} from '@app/themes';

const {width} = Dimensions.get('window');

export const Page = styled.View`
  flex: 1;
`;

export const CenterPage = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Item = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: ${s(10)}px ${s(15)}px;
  background: ${Colors.background};
`;

export const ContentWrapper = styled.View`
  flex-direction: row;
  align-items: center;
`;

export default StyleSheet.create({
  nameStyle: {
    width: width / 2,
  },
  emptyText: {
    marginTop: 10,
  },
});
