/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {ProfileBanner, ProfileTabContent} from '@component/shared';
import {useNavigation} from '@react-navigation/native';
import {HeaderBackground} from '@component/shared/stateless';
import {has} from 'lodash';
import Api from '@api';

import EventTimeline from './EventTimeline';
import {Page} from './styles';
import {hasJoinableEvent} from './functions';
import showSnackBar from '@app/components/notifications/snackbar';

const Screen: React.FunctionComponent<any> = (props) => {
  const {route} = props;
  const navigation = useNavigation();
  const [userData, setUserData] = useState<any>(null);
  const [joinEventIsVisible, setJoinEventIsVisible] = useState<boolean>(false);
  let isHeaderBgShown = false;

  const getUserProfile = () => {
    Api.get(`/users/${route.params.id}`)
      .then((res: any) => {
        if (res.ok) {
          if (has(res, 'data.user')) {
            setUserData(res.data.user);
          }
        }
      })
      .catch(() => {
        props.navigation.goBack();
        showSnackBar('Unable to open the profile.');
      });
  };

  useEffect(() => {
    getUserProfile();
  }, [route.params.id]);

  if (!has(route, 'params.id')) {
    props.navigation.goBack();
  }

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

  const onJoinEvent = () => {
    setJoinEventIsVisible(true);
  };

  let location = !userData
    ? ''
    : `${userData.state ? userData.state + ', ' : ''}${
        userData.country ? userData.country : ''
      }`;

  if (has(userData, 'user_privacy_setting.show_my_location')) {
    if (!userData.user_privacy_setting.show_my_location) {
      location = '';
    }
  }

  return (
    <Page scrollEventThrottle={3} onScroll={handleScroll}>
      <ProfileBanner
        id={userData ? userData.id : ''}
        imageUrl={userData ? userData.profile_picture : ''}
        fullName={userData ? userData.name : ''}
        status={userData ? userData.event_status : ''}
        location={location}
        hasEvent={hasJoinableEvent(userData ? userData.event_data : [])}
        events={userData ? userData.event_data : []}
        onJoinEvent={onJoinEvent}
        isFriend
      />
      <ProfileTabContent
        whatsInMind={userData ? userData.whats_on_your_mind : ''}
        location={location}
        interest={userData ? userData.interest : ''}
        events={userData ? userData.event_data : []}
      />
      {!userData ? null : Array.isArray(userData.event_data) ? (
        <EventTimeline
          events={userData.event_data}
          isVisible={joinEventIsVisible}
          closeModal={() => setJoinEventIsVisible(false)}
        />
      ) : null}
    </Page>
  );
};

export default Screen;
