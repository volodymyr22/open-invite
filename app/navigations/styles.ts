import styled from 'styled-components/native';
import {s} from 'react-native-size-matters';
import {StyleSheet} from 'react-native';
import {Colors, Fonts} from '@app/themes';

export const SearchContainer = styled.View`
  flex: 1;
  width: 100%;
  height: ${s(80)}px;
`;

export const TabWrap = styled.View`
  align-items: center;
`;
export const TabText = styled.Text<any>`
  font-family: ${Fonts.OPEN_SANS_REGULAR};
  color: ${({color}: any) => color};
`;

export const Title = styled.Text`
  color: ${Colors.onPrimary};
  font-family: ${Fonts.TITILLIUM_WEB_BOLD};
  font-size: ${s(20)}px;
  margin-left: ${s(15)}px;
`;

export const HeaderWrapper = styled.View`
  flex-direction: row;
`;

export const HeaderButton = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8,
})<any>`
  padding-top: ${s(5)}px;
  padding-bottom: ${s(5)}px;
  padding-left: ${({noPadding}) => (noPadding ? s(5) : s(15))}px;
  padding-right: ${({noPadding}) => (noPadding ? s(5) : s(15))}px;
`;

export const WrapWithBadge = styled.View`
  padding: 5px;
`;
export const Dot = styled.View<any>`
  position: absolute;
  height: 10px;
  width: 10px;
  background: #ff0000;
  border-radius: 4px;
  top: 0;
  right: ${({near}) => (near ? '10px' : 0)};
`;

export const optionsStyles = {
  optionsContainer: {
    padding: 5,
    shadowOffset: {
      width: 0,
      height: 0,
    },
  },
  optionsWrapper: {},
  optionWrapper: {
    margin: 5,
  },
  optionTouchable: {
    activeOpacity: 70,
  },
  optionText: {},
  menuOption: {},
};

export const triggerStyles = {
  triggerText: {},
  triggerOuterWrapper: {},
  triggerWrapper: {},
  triggerTouchable: {
    underlayColor: 'transparent',
    style: {
      paddingHorizontal: s(10),
    },
  },
};

export default StyleSheet.create({
  headerBackStyle: {
    color: Colors.darkText,
    fontFamily: Fonts.OPEN_SANS_SEMI_BOLD,
    paddingLeft: s(5),
  },
  headerStyle: {
    color: Colors.darkText,
    fontFamily: Fonts.OPEN_SANS_SEMI_BOLD,
    fontSize: s(16),
  },
  primaryHeaderTitleStyle: {
    color: Colors.onPrimary,
    fontFamily: Fonts.OPEN_SANS_SEMI_BOLD,
    fontSize: s(16),
  },
});
