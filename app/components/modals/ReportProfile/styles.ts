import styled from 'styled-components/native';
import {s} from 'react-native-size-matters';
import {List} from '@app/components/shared/stateless';
import {Colors} from '@app/themes';

export const Page = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  padding: ${s(45)}px;
`;
export const Container = styled.View`
  background: ${Colors.background};
  border-radius: ${s(5)}px;
`;
export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: ${s(7)}px ${s(15)}px;
  border-bottom-width: 2px;
  border-color: ${Colors.primary};
`;

export const CustomList = styled(List)`
  max-height: ${s(200)}px;
`;

export const ItemContainer = styled.TouchableOpacity.attrs({
  activeOpacity: 0.9,
})`
  padding: ${s(12.5)}px ${s(15)}px;
`;
