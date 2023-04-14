import styled from 'styled-components/native';
import {StyleSheet} from 'react-native';
import {s} from 'react-native-size-matters';
import {Colors, Metrics, Fonts} from '@app/themes';

export const Page = styled.View`
  flex: 1;
  background: ${Colors.background};
`;

export const DatePickContainer = styled.TouchableOpacity.attrs({
  activeOpacity: 0.9,
})`
  margin: ${s(3)}px ${s(10)}px;
`;

export const EmptyContainer = styled.View`
  flex: 1;
  justify-content: center;
  opacity: 0.7;
`;
export const DateCircle = styled.View<any>`
  height: ${s(40)}px;
  width: ${s(40)}px;
  border-radius: ${s(20)}px;
  background: ${({isCurrent}) =>
    isCurrent ? Colors.primary : Colors.copylink};
  justify-content: center;
  align-items: center;
`;

export const Divider = styled.View`
  width: 100%;
  height: 1px;
  background: ${Colors.secondaryVariant};
`;

export const TimeContainer = styled.View`
  margin-right: ${s(10)}px;
  width: ${s(55)}px;
`;

export const TimeSelectorContainer = styled.View`
  flex: 1;
`;

export const LineItem = styled.View`
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  margin: ${s(2)}px ${s(10)}px;
`;
export const LineTextContainer = styled.TouchableOpacity.attrs({
  activeOpacity: 1,
})<any>`
  background: ${({bg}) => bg};
  border-width: 2px;
  border-color: ${({isSelected}) =>
    isSelected ? Colors.darkText : Colors.transparent};
  height: ${s(30)}px;
  border-radius: ${s(3)}px;
  justify-content: center;
  padding: 0 ${s(10)}px;
  flex: 1;
`;
export const EventWrapper = styled.View`
  margin-horizontal: ${s(25)};
  margin-top: ${s(20)};
  border-color: ${Colors.boxBorder};
  border-width: 1;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.05);
  border-radius: 8;
`;
export const EventHeader = styled.View`
  border-color: ${Colors.boxHeader};
  border-bottom-width: 0.5;
  margin-bottom: ${s(15)};
  margin-left: ${s(10)};
  margin-right: ${s(15)};
`;
export const LocationWrapper = styled.View`
  flex-direction: row;
  flex: 1;
  padding-right: ${s(13)};
  padding-vertical: ${s(13)};
  align-items: center;
`;
export const OnMeWrapper = styled.View`
  flex-direction: row;
  flex: 1;
  align-items: center;
  padding-bottom: ${s(13)};
`;

export const OnMeTextWrapper = styled.View`
  margin-right: ${s(5)}px;
  margin-left: ${s(5)}px;
`;
export const LocationTextWrapper = styled.View`
  margin-right: ${s(10)}px;
  margin-left: ${s(5)}px;
`;

export const OnMeText = styled.Text`
  font-size: 12;
  font-family: ${Fonts.OPEN_SANS_BOLD};
`;

export const OnMeTextLight = styled.Text`
  font-size: 12;
  font-family: ${Fonts.OPEN_SANS_REGULAR};
`;

export const LocationText = styled.Text`
  font-size: 12;
  font-family: ${Fonts.OPEN_SANS_REGULAR};
`;

export const OnMeImage = styled.Image.attrs({
  resizeMode: 'contain',
})`
  height: ${s(25)}px;
  width: ${s(25)}px;
`;

export default StyleSheet.create({
  timelist: {
    paddingTop: 10,
  },
  timeText: {
    textAlign: 'right',
  },
});
