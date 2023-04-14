import styled from 'styled-components/native';
import {s} from 'react-native-size-matters';

export const Container = styled.TouchableOpacity<any>`
  flex-direction: row;
  padding: ${s(10)}px ${s(15)}px;
  align-items: center;
  background: ${({isViewed}) =>
    !isViewed ? 'rgba(0, 0, 0, 0.05)' : 'transparent'};
`;
export const Content = styled.View`
  padding-left: ${s(15)}px;
  flex: 1;
`;
