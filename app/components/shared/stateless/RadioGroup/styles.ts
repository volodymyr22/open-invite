import styled from 'styled-components/native';
import {s} from 'react-native-size-matters';
import {Colors} from '@app/themes';

export const RadioContainer = styled.TouchableOpacity<any>`
  margin-bottom: ${s(15)}px;
  border-bottom-width: 1px;
  border-color: ${({isLast}) =>
    isLast ? Colors.transparent : Colors.secondaryVariant};
  padding-bottom: ${({isLast}) => (isLast ? 0 : s(15))}px;
`;
