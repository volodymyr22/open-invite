import styled from 'styled-components/native';
import {Colors} from '@app/themes';
import {s} from 'react-native-size-matters';
import {Dimensions} from 'react-native';

const {height} = Dimensions.get('window');

export const Page = styled.View`
  flex: 1;
  background-color: ${Colors.background};
`;

export const HeaderWrapper = styled.View`
  background: ${Colors.background};
  padding: ${s(15)}px 0 ${s(5)}px;
`;

export const EmptyContainer = styled.View`
  height: ${height - 200}px;
  justify-content: center;
  align-items: center;
`;
