import styled from 'styled-components/native';
import {Colors} from '@app/themes';
import {s} from 'react-native-size-matters';

export const Page = styled.View`
  flex: 1;
  background: ${Colors.background};
`;

export const ContactContainer = styled.View`
  padding: ${s(15)}px ${s(15)}px;
`;

export const PhoneWrap = styled.TouchableOpacity.attrs({
  activeOpacity: 0.9,
})`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: ${s(10)}px ${s(20)}px;
  margin: ${s(5)}px 0;
  background: rgba(0, 0, 0, 0.05);
  border-radius: 5px;
`;

export const LoaderContainer = styled.View`
  height: ${s(45)}px;
  background: ${Colors.onBackground};
  justify-content: center;
  align-items: center;
`;

export const SearchContainer = styled.View`
  padding: ${s(10)}px ${s(15)}px;
  background: ${Colors.background};
`;
