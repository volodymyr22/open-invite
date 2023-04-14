import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {ChatListScreen} from '@app/containers';

const Stack = createStackNavigator();

const ChatNavigator: React.FC<any> = () => {
  return (
    <Stack.Navigator initialRouteName="ChatList">
      <Stack.Screen
        name="ChatList"
        component={ChatListScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default ChatNavigator;
