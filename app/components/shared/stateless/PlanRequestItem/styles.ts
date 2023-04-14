import styled from 'styled-components/native';
import {s} from 'react-native-size-matters';
import {Colors} from '@app/themes';

export const Container = styled.View`
  padding: ${s(10)}px ${s(10)}px ${s(10)}px ${s(15)}px;
`;

export const ItemContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Wrapper = styled.View`
  flex-direction: row;
  align-items: center;
  flex: 1;
`;

export const OpenButton = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8,
  hitSlop: {
    right: 10,
    top: 20,
    left: 0,
    bottom: 20,
  },
})``;

export const NewRequestContainer = styled.View`
  flex-direction: row;
  flex: 1;
`;
export const NewRequestWrapper = styled.View`
  flex: 1;
  padding-left: ${s(10)}px;
  justify-content: center;
`;

export const FriendSuggestionWrapper = styled.TouchableOpacity.attrs({
  activeOpacity: 0.9,
})`
  flex: 1;
  padding-left: ${s(10)}px;
  justify-content: center;
`;

export const UserDetails = styled.View`
  /* flex-direction: row; */
  /* align-items: center; */
`;
export const Message = styled.View`
  border: 1px solid ${Colors.secondaryVariant};
  align-self: flex-start;
  padding: ${s(2.5)}px ${s(5)}px;
  margin-top: ${s(5)}px;
  max-width: 75%;
`;
export const MeetupTime = styled.View`
  align-self: flex-start;
  justify-content: flex-start;
  padding: ${s(2.5)}px 0;
  margin-top: ${s(5)}px;
  max-width: 75%;
`;

export const ActionsWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  padding-right: ${s(10)}px;
`;

export const ItemContent = styled.View`
  background-color: ${Colors.surface};
  margin-top: ${s(10)}px;
`;

export const ContentContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: ${s(10)}px;
`;

export const TimeWrap = styled.View`
  background-color: ${Colors.orange};
  padding: ${s(2.5)}px ${s(5)}px;
  margin-top: ${s(3)}px;
`;
