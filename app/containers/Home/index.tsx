/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useCallback, useState} from 'react';
import {RefreshControl, View, SafeAreaView} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {has} from 'lodash';
import moment from 'moment';
import {useNavigation} from '@react-navigation/native';
import {ProfileBanner, PlansList, FriendList} from '@component/shared';
import {HeaderBackground, Button, Seperator} from '@component/shared/stateless';

import {Page, WrapPage} from './styles';
import {IRootState} from '@app/features/reducers';
import getAvailabilityString from '@helpers/getAvailabilityString';
import {Event} from '@app/types';
import Location from '@helpers/location';
import {getTodaysEvents, getUpcomingEvents} from './functions';
import {authTypes, globalTypes} from '@feature/constants';
import {Colors} from '@app/themes';

const Screen: React.FunctionComponent<any> = (props) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {user, isFetching} = useSelector(
    (state: IRootState) => state.authReducer,
  );
  const eventData = useSelector(
    (state: IRootState) => state.eventReducer.eventData,
  );

  const {
    id,
    name,
    profile_picture,
    event_status,
    state,
    country,
    event_data,
  } = user;

  const _event: Event | null = Array.isArray(event_data) ? event_data[0] : null;
  const getLocation = () => {
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
            .catch((ex) => console.log(ex));
        }
      })
      .catch((ex) => console.log(ex));
  };

  useEffect(() => {
    getLocation();
  }, [getLocation]);

  let isHeaderBgShown = false;
  const handleScroll = (event: any) => {
    const _y = event.nativeEvent.contentOffset.y;
    if (_y >= 15) {
      if (!isHeaderBgShown) {
        isHeaderBgShown = true;
        navigation.setOptions({
          headerBackground: () => <HeaderBackground />,
        });
      }
    } else {
      if (isHeaderBgShown) {
        isHeaderBgShown = false;
        navigation.setOptions({
          headerBackground: () => null,
        });
      }
    }
  };

  return (
    <>
      <WrapPage />
      <SafeAreaView style={{flex: 1}}>
        <Page
          scrollEventThrottle={3}
          onScroll={handleScroll}
          refreshControl={
            <RefreshControl
              refreshing={isFetching}
              tintColor={Colors.background}
              onRefresh={() => {
                dispatch({type: authTypes.GET_CURRENT_USER});
              }}
            />
          }>
          <ProfileBanner
            imageUrl={profile_picture}
            fullName={name}
            status={event_status}
            location={`${state ? state + ', ' : ''}${country ? country : ''}`}
            availability={getAvailabilityString(_event)}
            events={event_data}
            transparent
          />
          <View style={{backgroundColor: Colors.background}}>
            <PlansList
              title="Today's Plans"
              emptyMsg="You have no plan for today"
              plans={getTodaysEvents(eventData, id).sort((a, b) => {
                return moment(a.startTime).diff(moment(b.startTime));
              })}
            />
            <PlansList
              title="Upcoming"
              emptyMsg="You have no upcoming plans"
              plans={getUpcomingEvents(eventData, id).sort((a, b) => {
                return moment(a.startTime).diff(moment(b.startTime));
              })}
            />
            <Button
              text="VIEW ALL"
              fillType="plain"
              onPress={() => props.navigation.navigate('MyPlans')}
            />
            <Seperator height={10} />
          </View>
          <FriendList />
        </Page>
      </SafeAreaView>
    </>
  );
};

export default Screen;
