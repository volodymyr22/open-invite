import styled from 'styled-components/native';
import {s} from 'react-native-size-matters';

import {Colors, Fonts, Metrics, Images} from '@app/themes';
import {StyleSheet} from 'react-native';

export const Container = styled.ImageBackground.attrs(({transparent}: any) => ({
  source: transparent ? null : Images.bg,
  resizeMode: 'cover',
}))<any>`
  min-height: ${s(250)}px;
  width: 100%;
  background: ${({transparent}) =>
    transparent ? 'transparent' : Colors.primary};
  padding: ${Metrics.HEADER_HEIGHT}px ${s(20)}px ${s(20)}px;
  padding-top: ${({transparent}) =>
    transparent ? Metrics.HEADER_HEIGHT - 20 : Metrics.HEADER_HEIGHT}px;
  align-items: center;
`;

export const Row = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Divider = styled.Text`
  color: ${Colors.onPrimary};
  font-family: ${Fonts.OPEN_SANS_LIGHT};
  font-size: ${s(14)}px;
  padding: 0 ${s(5)}px;
`;

export const LocationContainer = styled.View`
  flex-direction: row;
  align-items: center;
  max-width: 80%;
`;

export const CurrentUserActions = styled.View`
  flex-direction: row;
`;

export const ViewersActions = styled.View`
  flex-direction: row;
  align-items: center;
`;
export const JoinInvite = styled.TouchableOpacity.attrs({
  activeOpacity: 0.9,
})`
  padding: 0 ${s(15)}px;
  height: ${s(30)}px;
  border-radius: ${Metrics.BORDER_RADIUS}px;
  background: ${Colors.onPrimary};
  border: ${Colors.onPrimary};
  margin: 0 ${s(5)}px;
  justify-content: center;
  align-items: center;
`;
export const SuggestFriend = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8,
})`
  border: ${Colors.onPrimary};
  padding: 0 ${s(15)}px;
  height: ${s(30)}px;
  border-radius: ${Metrics.BORDER_RADIUS}px;
  margin: 0 ${s(5)}px;
  justify-content: center;
  align-items: center;
`;

export const MoreActions = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8,
})`
  border: ${Colors.onPrimary};
  padding: 0 ${s(5)}px;
  border-radius: ${Metrics.BORDER_RADIUS}px;
  height: ${s(30)}px;
  justify-content: center;
  align-items: center;
`;

export const JoinInviteText = styled.Text`
  color: ${Colors.primary};
  font-family: ${Fonts.OPEN_SANS_REGULAR};
  font-size: ${s(13)}px;
`;
export const SuggestFriendText = styled.Text`
  color: ${Colors.onPrimary};
  font-family: ${Fonts.OPEN_SANS_REGULAR};
  font-size: ${s(13)}px;
`;

export default StyleSheet.create({
  locationText: {
    maxWidth: '100%',
  },
  hyperlink: {
    borderBottomWidth: 1,
    borderColor: '#FFFFFF',
    paddingBottom: 5,
    paddingHorizontal: 5,
  },
});
