import styled from 'styled-components/native';
import {s} from 'react-native-size-matters';

export const Page = styled.View`
  flex: 1;
  justify-content: space-evenly;
`;

export const FacebookWrap = styled.View`
  position: absolute;
  padding: 0 ${s(45)}px;
  bottom: ${s(60)}px;
  width: 100%;
`;
