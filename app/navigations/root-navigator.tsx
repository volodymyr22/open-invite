/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import auth from '@react-native-firebase/auth';

import AuthenticatedNavigator from '@app/navigations/authenticated-navigator';
import {LoginScreen} from '@app/containers';
import {authTypes} from '@feature/constants';
import {IRootState} from '@app/features/reducers';
import {navigationRef} from '@navigation';

const Stack = createStackNavigator();

const RootNavigation: React.FC<any> = () => {
  const {loggedIn} = useSelector((state: IRootState) => state.authReducer);
  const dispatch = useDispatch();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (auth().currentUser) {
      dispatch({type: authTypes.HANDLE_AUTH_CHANGE});
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn !== loggedIn) {
      setIsLoggedIn(loggedIn);
    }
  }, [loggedIn]);

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator initialRouteName="Login" headerMode="none">
        {!isLoggedIn ? (
          <Stack.Screen name="Login" component={LoginScreen} />
        ) : (
          <Stack.Screen
            name="Authenticated"
            component={AuthenticatedNavigator}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;
