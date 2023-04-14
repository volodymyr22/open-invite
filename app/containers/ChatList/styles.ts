import styled from 'styled-components/native';
import {Dimensions} from 'react-native';
import {Colors, Fonts, Metrics} from '@app/themes';
import {s} from 'react-native-size-matters';

const {height} = Dimensions.get('window');

export const Page = styled.View`
  flex: 1;
  background-color: ${Colors.background};
`;

export const EmptyContainer = styled.View`
  height: ${height - 200}px;
  justify-content: center;
  align-items: center;
`;
export const HeaderWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  height: ${Metrics.HEADER_HEIGHT};
  background: ${Colors.primary};
  padding-bottom: ${s(10)};
  padding-right: ${s(10)};
  padding-left: ${s(25)};
`;
export const HeaderTitle = styled.Text`
  font-size: ${s(16)};
  color: ${Colors.onPrimary};
  font-family: ${Fonts.OPEN_SANS_SEMI_BOLD};
`;

export const HeaderButton = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8,
})<any>`
  padding-top: ${s(5)}px;
  padding-bottom: ${s(5)}px;
  padding-left: ${({noPadding}) => (noPadding ? s(5) : s(15))}px;
  padding-right: ${({noPadding}) => (noPadding ? s(5) : s(15))}px;
`;
