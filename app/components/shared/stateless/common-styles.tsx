import React from 'react';
import styled from 'styled-components/native';
import {Dimensions, FlatListProps, ActivityIndicator} from 'react-native';
import {s} from 'react-native-size-matters';
import {Colors} from '@app/themes';
import {FlatList} from 'react-native-gesture-handler';
import {Text} from '@component/shared/stateless';

const {width} = Dimensions.get('window');

export const SafeArea = styled.SafeAreaView`
  flex: 1;
`;

export const Seperator = styled.View<any>`
  width: 100%;
  height: ${({height}) => height || 10}px;
`;

export const Spacer = styled.View<any>`
  width: ${({_width}) => _width || 10}px;
`;

export const ItemSeperator = styled.View`
  margin-left: ${s(15)}px;
  width: ${width - s(15)}px;
  height: 1px;
  background-color: ${Colors.secondaryVariant};
  align-self: flex-end;
`;

export const Row = styled.View<any>`
  flex-direction: row;
  align-items: ${({align}: any) => (align ? align : 'flex-start')};
  justify-content: ${({justify}: any) => (justify ? justify : 'flex-start')};
  margin-bottom: ${({bottom}: any) => (bottom ? s(bottom) : 0)}px;
`;

export const List = styled(FlatList).attrs<FlatListProps<any>>({
  ItemSeparatorComponent: ItemSeperator,
})``;

export const LoadingLayout = styled.View.attrs({
  children: <ActivityIndicator />,
})`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const HeaderBackground = styled.View`
  width: 100%;
  height: 100%;
  background: ${Colors.primary};
`;

export const SplashBackground = styled.View`
  background: ${Colors.primary};
  height: 50%;
  justify-content: center;
  align-items: center;
`;

export const SplashPage = styled.View`
  flex: 1;
  justify-content: center;
`;

export const SplashLoader = styled.View`
  position: absolute;
  bottom: ${s(60)}px;
  width: 100%;
`;

export const Splash = () => {
  const commonStyles: any = {
    center: true,
    color: Colors.onBackground,
    weight: 'bold',
    family: 'Titillium',
  };
  return (
    <SplashBackground>
      <Text {...commonStyles} size={80}>
        oInvite
      </Text>
      <Text {...commonStyles} size={28}>
        Be Social
      </Text>
    </SplashBackground>
  );
};
