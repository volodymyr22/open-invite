import styled from 'styled-components/native';
import {s} from 'react-native-size-matters';

export const Container = styled.TouchableOpacity`
  flex-direction: row;
  padding: ${s(10)}px ${s(15)}px;
`;
export const Content = styled.View`
  padding-left: ${s(15)}px;
  justify-content: center;
`;
