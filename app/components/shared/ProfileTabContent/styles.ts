import styled from 'styled-components/native';
import {Colors} from '@app/themes';
import {s} from 'react-native-size-matters';

export const Wrapper = styled.View`
  background: ${Colors.background};
`;

export const Item = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 10px 0;
  margin: 0 10px;
  border-color: ${Colors.secondaryVariant};
  border-bottom-width: 1px;
`;
export const ItemLeft = styled.View`
  padding: 15px 10px 15px 0;
  border-color: ${Colors.secondaryVariant};
  border-right-width: 1px;
`;
export const ItemRight = styled.View`
  flex: 1;
  padding-left: 15px;
`;

export const ImageWrap = styled.Image`
  height: ${s(50)}px;
  width: ${s(50)}px;
  resize-mode: contain;
`;
