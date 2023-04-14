import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {
  FriendsProfileScreen,
  SuggestFriendsListScreen,
  SuggestFriendSendMessageScreen,
  FriendsProfileSettingsScreen,
  UnblockScreen,
} from '@app/containers';
import {rootHeaderType1WithoutMore, rootHeaderType3} from './shared-options';
import wrapRouterProps from '@helpers/injectRouteProps';

const Stack = createStackNavigator();

const FriendsProfileNavigator: React.FC<any> = (props: any) => {
  const injectProps: any = {
    route: props.route,
  };

  return (
    <Stack.Navigator initialRouteName="FriendsProfile" headerMode="screen">
      <Stack.Screen
        name="FriendsProfile"
        component={wrapRouterProps(FriendsProfileScreen, injectProps)}
        options={{...rootHeaderType1WithoutMore(true)}}
      />
      <Stack.Screen
        name="SuggestFriendsList"
        component={SuggestFriendsListScreen}
        options={{...rootHeaderType3('Suggest A Friend')}}
      />
      <Stack.Screen
        name="SuggestFriendMessage"
        component={SuggestFriendSendMessageScreen}
        options={{...rootHeaderType3('Suggest A Friend')}}
      />
      <Stack.Screen
        name="FriendsProfileSettings"
        component={FriendsProfileSettingsScreen}
        options={{...rootHeaderType3('More')}}
      />
      <Stack.Screen
        name="UnblockUsers"
        component={UnblockScreen}
        options={{...rootHeaderType3('Unblock Users')}}
      />
    </Stack.Navigator>
  );
};

export default FriendsProfileNavigator;
