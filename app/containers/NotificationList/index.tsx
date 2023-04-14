/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import moment from 'moment';

import {
  NotificationItem,
  List,
  Text,
  Seperator,
} from '@app/components/shared/stateless';
import {notificationsTypes} from '@app/features/constants';
import {useDispatch, useSelector} from 'react-redux';
import {IRootState} from '@app/features/reducers';
import {convertMsToDateTime} from '@app/helpers/time';
import LottieView from 'lottie-react-native';
import {s} from 'react-native-size-matters';
import {RefreshControl} from 'react-native';
import {updateNotification} from '@feature/notifications/service-calls';
import {Page, EmptyContainer} from './styles';

const TO_PAGE = {
  SUGGEST_FRIEND_REQUEST: 'PlansOnEvent',
  EVENT_ACCEPTED: 'PlansOnEvent',
  EVENT_INVITE: 'PlansOnEvent',
  CHAT: 'IndividualChat',
};

const Screen: React.FunctionComponent<any> = (props) => {
  const {navigation} = props;
  const dispatch = useDispatch();
  const notifications = useSelector(
    (state: IRootState) => state.notificationReducer.notifications,
  );
  const isFetching = useSelector(
    (state: IRootState) => state.notificationReducer.isFetching,
  );

  const user = useSelector((state: IRootState) => state.authReducer.user);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch({type: notificationsTypes.GET_NOTIFICATIONS});
      dispatch({type: notificationsTypes.GET_NOTIFICATIONS_COUNT});
      dispatch({type: notificationsTypes.SET_NOTIFICATION_TO_READ});
    });

    return unsubscribe;
  }, [navigation]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const markAsRead = (item) => {};

  const _notifications = Array.isArray(notifications) ? notifications : [];

  return (
    <Page>
      <List
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isFetching}
            onRefresh={() =>
              dispatch({type: notificationsTypes.GET_NOTIFICATIONS})
            }
          />
        }
        ListEmptyComponent={() => (
          <EmptyContainer>
            <LottieView
              source={require('./../../anims/no-notifications.json')}
              style={{
                height: s(200),
              }}
              autoPlay
              loop
            />
            <Seperator height={25} />
            <Text weight="semibold">No Notifications</Text>
          </EmptyContainer>
        )}
        data={_notifications.map((_data: any) => {
          const dateTime = convertMsToDateTime(
            _data.createdDate,
            _data.modifiedDate,
          );
          return {
            id: _data.senderUserId,
            imageUrl: _data.receiverProfilePicture,
            status: 'busy',
            message: _data.titile,
            time: moment(dateTime.start).format('DD/MM/YYYY LT'),
            to: TO_PAGE[_data.notifiationType],
            actualData: _data,
            isViewed: _data.viewedBy,
          };
        })}
        keyExtractor={(item: any, index: number) => `${item.id}_${index}`}
        renderItem={({item}: any) => (
          <NotificationItem
            {...item}
            onPress={() => {
              markAsRead(item);
              const _data = item.actualData;
              if (_data.notifiationType === 'EVENT') {
                if (_data.senderUserId !== user.id) {
                  props.navigation.navigate('FriendProfile', {
                    id: _data.senderUserId,
                  });
                }
              } else if (item.to) {
                props.navigation.navigate(item.to, {id: item.id});
              }
            }}
          />
        )}
      />
    </Page>
  );
};

export default Screen;
