import React from 'react';
import {useSelector} from 'react-redux';

import {ProfileBanner, ProfileTabContent} from '@component/shared';
import {useNavigation} from '@react-navigation/native';
import {HeaderBackground} from '@component/shared/stateless';

import {IRootState} from '@app/features/reducers';

import {Page} from './styles';

const Screen: React.FunctionComponent<any> = () => {
  const navigation = useNavigation();
  const user = useSelector((state: IRootState) => state.authReducer.user);
  const {
    name,
    profile_picture,
    event_status,
    state,
    country,
    whats_on_your_mind,
    interest,
    event_data,
  } = user;
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

  const location = `${state ? state + ', ' : ''}${country ? country : ''}`;

  return (
    <Page scrollEventThrottle={3} onScroll={handleScroll}>
      <ProfileBanner
        imageUrl={profile_picture}
        fullName={name}
        status={event_status}
        location={location}
        isProfilePage
        events={event_data}
      />
      <ProfileTabContent
        location={location}
        whatsInMind={whats_on_your_mind}
        interest={interest}
        events={event_data}
      />
    </Page>
  );
};

export default Screen;
