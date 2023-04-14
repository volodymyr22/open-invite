import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {ProfileScreen, EditProfileScreen} from '@app/containers';
import {rootHeaderType1} from './shared-options';

const Stack = createStackNavigator();

const ProfileNavigator: React.FC<any> = () => {
  return (
    <Stack.Navigator initialRouteName="Profile">
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{...rootHeaderType1()}}
      />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
    </Stack.Navigator>
  );
};

export default ProfileNavigator;
