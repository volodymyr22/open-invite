import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {
  HomeScreen,
  EditStatusScreen,
  PlansAndRequestsScreen,
  MyEventsScreen,
} from '@app/containers';

import {
  rootHeaderType1,
  rootHeaderType3,
} from '@app/navigations/shared-options';

import FriendsProfileNavigator from '@app/navigations/friendsprofile-navigator';

const Stack = createStackNavigator();

const HomeNavigator: React.FC<any> = () => {
  return (
    <Stack.Navigator initialRouteName="Home" headerMode="screen">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{...rootHeaderType1()}}
      />
      <Stack.Screen
        name="MyEvents"
        component={MyEventsScreen}
        options={{...rootHeaderType3('My Events')}}
      />
      <Stack.Screen
        name="EditStatus"
        component={EditStatusScreen}
        options={{...rootHeaderType3('My Status')}}
      />
      <Stack.Screen
        name="FriendProfile"
        component={FriendsProfileNavigator}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MyPlans"
        component={PlansAndRequestsScreen}
        options={{...rootHeaderType3('Your Plan and Requests')}}
      />
    </Stack.Navigator>
  );
};

export default HomeNavigator;
