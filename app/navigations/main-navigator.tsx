import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {
  SearchScreen,
  AboutUsScreen,
  EditProfileScreen,
  ImportContactsScreen,
  IndividualChatScreen,
} from '@app/containers';
import TabNavigator from '@app/navigations/tab-navigator';
import {BackBtn} from '@app/components/shared/stateless';
import {Colors} from '@app/themes';

import {rootHeaderType3} from '@app/navigations/shared-options';

const Stack = createStackNavigator();

const aboutUsHeaderOptions = {
  headerTransparent: true,
  headerTitle: '',
  headerBackTitleVisible: false,
  headerLeft: () => <BackBtn color={Colors.onPrimary} />,
};

const MainNavigator: React.FC<any> = () => {
  return (
    <Stack.Navigator initialRouteName="Tab" mode="modal">
      <Stack.Screen
        name="Tab"
        component={TabNavigator}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="EditProfileModal"
        component={EditProfileScreen}
        options={{...rootHeaderType3('Edit profile')}}
      />
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen
        name="AboutUs"
        component={AboutUsScreen}
        options={{...aboutUsHeaderOptions}}
      />
      <Stack.Screen
        name="ImportContacts"
        component={ImportContactsScreen}
        options={{...rootHeaderType3('Invite Contacts')}}
      />
      <Stack.Screen
        name="IndividualChat"
        component={IndividualChatScreen}
        options={{...rootHeaderType3()}}
      />
    </Stack.Navigator>
  );
};

export default MainNavigator;
