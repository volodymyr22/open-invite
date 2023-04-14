import styled from 'styled-components/native';
import {s} from 'react-native-size-matters';
import {Fonts, Colors} from '@app/themes';

export const Page = styled.View`
  flex: 1;
  background-color: ${Colors.background};
`;

export const HeaderLeft = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const HeaderTitle = styled.Text`
  font-family: ${Fonts.OPEN_SANS_REGULAR};
  font-size: ${s(14)}px;
`;

export const Wrapper = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    paddingVertical: s(20),
    paddingHorizontal: s(30),
  },
})`
  flex: 1;
`;

export const SafeArea = styled.SafeAreaView`
  flex: 1;
`;

export const KeyboardAvoiding = styled.KeyboardAvoidingView`
  flex: 1;
`;

export const Title = styled.Text`
  font-family: ${Fonts.OPEN_SANS_BOLD};
  font-size: ${s(16)}px;
`;
