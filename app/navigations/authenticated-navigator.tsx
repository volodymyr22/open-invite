/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';

import {RegisterScreen, OTPScreen} from '@app/containers';
import MainNavigator from '@app/navigations/main-navigator';
import {BackBtn} from '@app/components/shared/stateless';
import {IRootState} from '@app/features/reducers';
import {notificationsTypes} from '@app/features/constants';

import styles from './styles';

const Stack = createStackNavigator();

const headerOptions: StackNavigationOptions = {
  headerTitle: '',
  headerLeft: () => <BackBtn />,
  headerBackTitleStyle: styles.headerBackStyle,
  headerTitleStyle: styles.headerStyle,
};

const AuthenticatedNavigator: React.FC<any> = () => {
  const {user} = useSelector((state: IRootState) => state.authReducer);
  const dispatch = useDispatch();
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    dispatch({type: notificationsTypes.GET_NOTIFICATIONS_COUNT});
  }, []);

  useEffect(() => {
    if (user.otp_verified && !isVerified) {
      setIsVerified(true);
    }
  }, [user]);

  return (
    <Stack.Navigator
      initialRouteName="Onboarding"
      screenOptions={{
        ...headerOptions,
      }}>
      {!isVerified ? (
        <>
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen
            name="OTP"
            component={OTPScreen}
            options={{
              headerBackTitle: 'Back',
            }}
          />
        </>
      ) : (
        <Stack.Screen
          name="Main"
          component={MainNavigator}
          options={{headerShown: false}}
        />
      )}
    </Stack.Navigator>
  );
};

export default AuthenticatedNavigator;
