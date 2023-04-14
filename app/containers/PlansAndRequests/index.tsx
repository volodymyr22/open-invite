/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {SectionList, RefreshControl} from 'react-native';
import {s} from 'react-native-size-matters';
import LottieView from 'lottie-react-native';

import {
  PlanRequestItem,
  Text,
  Seperator,
} from '@app/components/shared/stateless';
import {eventTypes} from '@feature/constants';
import {IRootState} from '@app/features/reducers';
import moment from 'moment';
import {Page, HeaderWrapper, EmptyContainer} from './styles';
import {getEventRequests, getEvents, getFriendSuggestions} from './functions';

const Screen: React.FunctionComponent<any> = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: IRootState) => state.authReducer.user);
  const {
    event,
    eventData,
    isFetchingEvent,
    isFetchingEventInfo,
  }: any = useSelector((state: IRootState) => state.eventReducer);

  useEffect(() => {
    dispatch({type: eventTypes.GET_EVENT});
    dispatch({type: eventTypes.GET_EVENT_INFO});
  }, []);

  const data: any = [];
  const events = getEvents(eventData, user);
  const requests: any[] = getEventRequests(event?.eventResponseData);
  const todaysRequests: any[] = events.today.sort((a, b) => {
    return moment(a.startTime).diff(moment(b.startTime));
  });
  const upcomingRequests: any[] = events.upcoming.sort((a, b) => {
    return moment(a.startTime).diff(moment(b.startTime));
  });
  const pastEvents: any[] = events.past;
  const suggestions: any[] = getFriendSuggestions(event?.friendSuggestions);

  if (requests.length > 0) {
    data.push({
      title: 'Requests',
      data: requests,
    });
  }

  if (todaysRequests.length > 0) {
    data.push({
      title: "Today's Plans",
      data: todaysRequests,
    });
  }

  if (upcomingRequests.length > 0) {
    data.push({
      title: 'Upcoming Plans',
      data: upcomingRequests,
    });
  }

  if (pastEvents.length > 0) {
    data.push({
      title: 'Completed Plans',
      data: pastEvents,
    });
  }

  if (suggestions.length > 0) {
    data.push({
      title: 'Friend Suggestions',
      data: suggestions,
    });
  }

  return (
    <Page>
      <SectionList
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isFetchingEvent && isFetchingEventInfo}
            onRefresh={() => {
              dispatch({type: eventTypes.GET_EVENT});
              dispatch({type: eventTypes.GET_EVENT_INFO});
            }}
          />
        }
        sections={data}
        keyExtractor={(item, index) => item + index}
        ListEmptyComponent={() => (
          <EmptyContainer>
            <LottieView
              source={require('./../../anims/no-plans.json')}
              style={{
                height: s(250),
              }}
              autoPlay
              loop
            />
            <Seperator height={25} />
            <Text weight="semibold">No Plans or Requests yet</Text>
          </EmptyContainer>
        )}
        renderItem={({item}) => <PlanRequestItem actualData={item} {...item} />}
        renderSectionHeader={({section: {title}}) => (
          <HeaderWrapper>
            <Text weight="semibold" left={15} bottom={10}>
              {title}
            </Text>
          </HeaderWrapper>
        )}
      />
    </Page>
  );
};

export default Screen;
