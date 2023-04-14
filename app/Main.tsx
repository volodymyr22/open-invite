import React, {useEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import auth from '@react-native-firebase/auth';
import messaging from '@react-native-firebase/messaging';
import {MenuProvider} from 'react-native-popup-menu';
import {has} from 'lodash';
import DropdownAlert from 'react-native-dropdownalert';
import {s} from 'react-native-size-matters';

import * as eva from '@eva-design/eva';
import {ApplicationProvider} from '@ui-kitten/components';

import RootNavigator from '@app/navigations/root-navigator';
import {notificationsTypes} from '@app/features/constants';
import {ShareLink} from '@app/components/modals';
import {authTypes, globalTypes} from '@feature/constants';
import requestUserPermission from '@config/fcm';
import {navigate} from '@navigation';

import {default as theme} from '@app/themes/light.json';

import Location from '@helpers/location';
import {Colors, Fonts, Images} from './themes';
import {store} from './../App';

const Main: React.FunctionComponent<any> = () => {
  const dispatch = useDispatch();
  const notifRef = useRef<any>(null);
  const {user} = useSelector((state: IRootState) => state.authReducer);
  const showNotification = (title, body) => {
    console.log('[on notification]', title, body);
    notifRef.current.alertWithType('success', title, body);
  };

  useEffect(() => {
    const auth_unsubscriber = auth().onAuthStateChanged((user) => {
      dispatch({type: authTypes.HANDLE_AUTH_CHANGE, user});
    });

    const notif_unsubscribe = messaging().onMessage(
      async (remoteMessage: any) => {
        const isLoggedIn = store.getState().authReducer.loggedIn;
        if (isLoggedIn) {
          if (has(remoteMessage, 'data.notificationType')) {
            if (
              [
                'SUGGEST_FRIEND_REQUEST',
                'EVENT',
                'EVENT_ACCEPTED',
                'EVENT_INVITE',
                'CHAT',
                'EVENT_AVAILABLE_SOON',
                'EVENT_NOT_AVAILABLE',
              ].includes(remoteMessage.data.notificationType)
            ) {
              dispatch({type: notificationsTypes.GET_NOTIFICATIONS});
              dispatch({type: notificationsTypes.GET_NOTIFICATIONS_COUNT});
              dispatch({type: authTypes.GET_CURRENT_USER});
            }
          }

          if (
            has(remoteMessage, 'notification.body') &&
            has(remoteMessage, 'notification.title') &&
            notifRef.current
          ) {
            showNotification(
              remoteMessage?.notification?.title,
              remoteMessage?.notification?.body,
            );
          }
        }
      },
    );

    requestUserPermission()
      .then(() => console.log('Notification Permission granted'))
      .catch((ex) => console.log('No notification Permission', ex));

    Location.managePermissions()
      .then((isGranted: boolean) => {
        if (isGranted) {
          Location.getCurrentLocation()
            .then((location) => {
              dispatch({type: globalTypes.UPDATE_LOCATION, location});
              dispatch({
                type: authTypes.UPDATE_USER,
                user: {...user, location},
                showAlert: false,
              });
            })
            .catch((ex) => console.log('in catch not getting location'));
        }
      })
      .catch((ex) => console.log(ex));

    return () => {
      auth_unsubscriber();
      notif_unsubscribe();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <ApplicationProvider {...eva} theme={{...eva.light, ...theme}}>
        <MenuProvider>
          <RootNavigator />
          <ShareLink />
        </MenuProvider>
      </ApplicationProvider>
      <DropdownAlert
        ref={notifRef}
        successColor={Colors.surface}
        activeStatusBarStyle="dark-content"
        activeStatusBarBackgroundColor={Colors.surface}
        inactiveStatusBarBackgroundColor={Colors.primary}
        inactiveStatusBarStyle="light-content"
        titleStyle={{
          fontFamily: Fonts.OPEN_SANS_BOLD,
          color: Colors.copylink,
          fontSize: s(14),
        }}
        messageStyle={{
          fontFamily: Fonts.OPEN_SANS_ITALIC,
          color: Colors.darkText,
          fontSize: s(13),
        }}
        successImageSrc={Images.notification}
        onTap={() => {
          try {
            navigate('NotificationsTab', {});
          } catch (ex) {
            console.log(ex);
          }
        }}
      />
    </>
  );
};

export default Main;
