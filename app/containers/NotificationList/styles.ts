import styled from 'styled-components/native';
import {Dimensions} from 'react-native';
import {Colors} from '@app/themes';
import {s} from 'react-native-size-matters';

const {height} = Dimensions.get('window');

export const Page = styled.View`
  flex: 1;
  background: ${Colors.background};
`;

export const EmptyContainer = styled.View`
  height: ${height - 200}px;
  justify-content: center;
  align-items: center;
`;
