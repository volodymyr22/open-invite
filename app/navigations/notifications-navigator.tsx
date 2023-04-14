import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {NotificationListScreen, PlansAndRequestsScreen} from '@app/containers';
import FriendProfileNavigator from '@app/navigations/friendsprofile-navigator';
import {rootHeaderType2, rootHeaderType3} from './shared-options';

const Stack = createStackNavigator();

const NotificationsNavigator: React.FC<any> = () => {
  return (
    <Stack.Navigator initialRouteName="Notifications">
      <Stack.Screen
        name="Notifications"
        component={NotificationListScreen}
        options={{...rootHeaderType2('Notifications')}}
      />
      <Stack.Screen
        name="FriendProfile"
        component={FriendProfileNavigator}
        options={{header: () => null}}
      />
      <Stack.Screen
        name="PlansOnEvent"
        component={PlansAndRequestsScreen}
        options={{...rootHeaderType3('Your Plan and Requests')}}
      />
    </Stack.Navigator>
  );
};

export default NotificationsNavigator;
