import styled from 'styled-components/native';
import {s} from 'react-native-size-matters';
import {Colors, Fonts} from '@app/themes';

export const Page = styled.View`
  flex: 1;
  padding: ${s(15)}px;
  background: ${Colors.background};
`;

export const MessageBox = styled.TextInput.attrs({
  multiline: true,
  numberOfLines: 5,
  placeholder: 'Hey, I think you should check out this profile',
})`
  border: 1px solid ${Colors.secondaryVariant};
  height: ${s(125)}px;
  margin-top: ${25}px;
  padding: ${s(10)}px;
  font-family: ${Fonts.OPEN_SANS_REGULAR};
`;

export const ProfileContainer = styled.View`
  flex-direction: row;
  align-items: center;
  padding: ${s(5)}px ${s(0)}px;
`;
