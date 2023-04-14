/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {StatusBar} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeNavigator from '@app/navigations/home-navigator';
import ChatNavigator from '@app/navigations/chat-navigator';
import NotificationsNavigator from '@app/navigations/notifications-navigator';
import ProfileNavigator from '@app/navigations/profile-navigator';
import {Colors} from '@app/themes';
import {s} from 'react-native-size-matters';
import {Icon} from '@app/components/shared/stateless';

import {TabWrap, TabText, WrapWithBadge, Dot} from './styles';
import {IRootState} from '@app/features/reducers';

import Chat from '@helpers/chat';
import {has} from 'lodash';

const Tab = createBottomTabNavigator();

const TabItem: React.FunctionComponent<any> = (props) => (
  <TabWrap>
    <Icon name={props.name} color={props.color} size={s(20)} />
    {props.focused ? (
      <TabText color={props.color}>{props.title}</TabText>
    ) : null}
  </TabWrap>
);

const TabNavigator = () => {
  const userId = useSelector((state: IRootState) => state.authReducer.user.id);

  const notifCount: any = useSelector(
    (state: IRootState) => state.notificationReducer.notificationsCount,
  );
  const unreadMsg: any = useSelector(
    (state: IRootState) => state.globalReducer.hasUnreadMessage,
  );
  const [unread, setUnread] = useState(unreadMsg);
  const dispatch = useDispatch();

  useEffect(() => {
    Chat.startListeningToUnreadMessages(userId).onSnapshot((querySnapshot) => {
      const data: any = querySnapshot.data();

      if (data) {
        dispatch({
          type: 'LISTEN_UNREAD_MSG',
          unread: data.hasUnreadMsg,
        });
      }
    });
  }, []);

  useEffect(() => {
    setUnread(unreadMsg);
  }, [unreadMsg]);

  let _hasUnreadNotif = false;

  if (has(notifCount, 'totalNotificationSend')) {
    _hasUnreadNotif =
      notifCount.totalNotificationViewed < notifCount.totalNotificationSend
        ? true
        : false;
  }

  return (
    <>
      <StatusBar backgroundColor={Colors.primary} barStyle="light-content" />
      <Tab.Navigator
        initialRouteName="HomeTab"
        tabBarOptions={{
          showLabel: false,
          activeTintColor: Colors.primary,
          inactiveTintColor: Colors.lightText,
          style: {minHeight: s(57)},
          tabStyle: {height: s(57)},
        }}>
        <Tab.Screen
          name="HomeTab"
          component={HomeNavigator}
          options={{
            tabBarIcon: ({color, focused}) => (
              <TabItem
                name="home"
                title="Home"
                color={color}
                focused={focused}
              />
            ),
          }}
        />
        <Tab.Screen
          name="ChatTab"
          component={ChatNavigator}
          options={{
            tabBarIcon: ({color, focused}) => (
              <WrapWithBadge>
                {unread ? <Dot near={focused ? true : false} /> : null}
                <TabItem
                  name={'message-line'}
                  title="Messaging"
                  color={color}
                  focused={focused}
                />
              </WrapWithBadge>
            ),
          }}
        />
        <Tab.Screen
          name="NotificationsTab"
          component={NotificationsNavigator}
          options={{
            tabBarIcon: ({color, focused}) => (
              <WrapWithBadge>
                {_hasUnreadNotif ? <Dot near={focused ? true : false} /> : null}
                <TabItem
                  name="notification"
                  title="Notification"
                  color={color}
                  focused={focused}
                />
              </WrapWithBadge>
            ),
          }}
        />
        <Tab.Screen
          name="ProfileTab"
          component={ProfileNavigator}
          options={{
            tabBarIcon: ({color, focused}) => (
              <TabItem
                name="user"
                title="Profile"
                color={color}
                focused={focused}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
};

export default TabNavigator;
