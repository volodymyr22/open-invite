import {StyleSheet} from 'react-native';
import styled from 'styled-components/native';
import {s} from 'react-native-size-matters';
import {Colors, Fonts} from '@app/themes';

export const SafeArea = styled.SafeAreaView`
  background: ${Colors.background};
`;

export const Page = styled.View`
  flex: 1;
  background: ${Colors.background};
`;

export const SearchContainer = styled.View`
  height: ${s(50)}px;
  width: 100%;
  flex-direction: row;
  align-items: center;
  background: ${Colors.background};
  padding-right: ${s(10)}px;
  border-bottom-width: 1px;
  border-color: ${Colors.surface};
`;

export const SearchInput = styled.TextInput.attrs({
  placeholder: 'Search for people',
  placeholderTextColor: Colors.darkText,
  clearButtonMode: 'always',
  inlineImageLeft: 'search_icon',
  returnKeyType: 'search',
  maxLength: 100,
  autoFocus: true,
})`
  height: 100%;
  flex: 1;
  font-size: ${s(14)}px;
  font-family: ${Fonts.OPEN_SANS_REGULAR};
  color: ${Colors.darkBg};
`;

export const ButtonContainer = styled.View`
  height: 100%;
  padding: 0 ${s(10)}px;
  justify-content: center;
`;

export default StyleSheet.create({
  loadingWrapper: {
    padding: s(15),
  },
});
