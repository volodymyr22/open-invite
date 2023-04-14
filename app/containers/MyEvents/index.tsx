/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useRef, useEffect} from 'react';
import {View} from 'react-native';
import {Text, Row, Seperator, Icon} from '@component/shared/stateless';
import {FlatList, ActivityIndicator} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import moment from 'moment';
import {convertMsToDateTime} from '@helpers/time';
import {sortBy, find, has, findIndex} from 'lodash';

import styles, {
  Page,
  DatePickContainer,
  DateCircle,
  TimeContainer,
  TimeSelectorContainer,
  LineItem,
  LineTextContainer,
  EmptyContainer,
  EventWrapper,
  EventHeader,
  LocationWrapper,
  OnMeWrapper,
  LocationText,
  OnMeText,
  OnMeImage,
  OnMeTextWrapper,
  LocationTextWrapper,
  OnMeTextLight,
} from './styles';
import {Colors} from '@app/themes';
import {Divider} from '@app/components/shared/ProfileBanner/styles';
import {IRootState} from '@app/features/reducers';
import {authTypes} from '@app/features/constants';
import showSnackBar from '@app/components/notifications/snackbar';
import {OnMeItems} from './options';
import {
  getDateList,
  checkIfSlotOrderIsInSequence,
  getSelectedStartEndTime,
} from './functions';

const TimeItem = (props) => {
  const {
    slotId,
    status,
    startTime,
    endTime,
    acceptedUserName,
    // onSelectTime,
    currentSelected,
    slotsCount,
    slotOrder,
  } = props;

  const available = status === 'Accepted' ? false : true;
  const datetime = convertMsToDateTime(startTime, endTime);

  let lineText: any = <LineTextContainer bg={Colors.secondaryVariant} />;
  let time = (
    <TimeContainer>
      <Text color={Colors.onSecondary} size={11} style={styles.timeText}>
        {moment(datetime.start).format('LT')}
      </Text>
      {slotsCount === slotOrder && (
        <View>
          <Seperator height={10} />
          <Text color={Colors.onSecondary} size={11} style={styles.timeText}>
            {moment(datetime.end).format('LT')}
          </Text>
          <Seperator height={20} />
        </View>
      )}

      {/* <Text center color={Colors.onSecondary} size={10}>
        to
      </Text>
      <Text color={Colors.onSecondary} size={11} center>
        {moment(datetime.end).format('LT')}
      </Text> */}
    </TimeContainer>
  );

  if (available) {
    lineText = (
      <LineTextContainer
        bg={Colors.eventGreen}
        isSelected={find(currentSelected, {slotId: slotId}) ? true : false}>
        <Text weight="semibold" color={Colors.onPrimary}>
          Available
        </Text>
      </LineTextContainer>
    );
  }

  if (acceptedUserName || !available) {
    lineText = (
      <LineTextContainer bg={Colors.eventRed}>
        <Text weight="semibold" color={Colors.onPrimary}>
          {acceptedUserName}
        </Text>
      </LineTextContainer>
    );
  }

  return (
    <LineItem>
      {time}
      {lineText}
    </LineItem>
  );
};

const TimeSelector = (props) => {
  const {event, bounceTimeSlotSelect} = props;
  const [selectedEvent, setSelectedEvent] = useState<any>({});

  const onSelectTime = (_slot, _event) => {
    const _selectedEvent = {...selectedEvent};
    if (has(selectedEvent[_event.eventId], 'slots')) {
      const _ids = _selectedEvent[_event.eventId].slots;
      const checkIndex = findIndex(_ids, {slotId: _slot.slotId});
      if (checkIndex >= 0) {
        const _check = [..._ids];
        _check.splice(checkIndex, 1);
        const isOk = checkIfSlotOrderIsInSequence(_check);
        if (isOk) {
          _ids.splice(checkIndex, 1);
        } else {
          showSnackBar('Removing this breaks the continuous sequence', true);
        }
      } else {
        const isInSequence = checkIfSlotOrderIsInSequence(_ids, _slot);
        if (isInSequence) {
          _selectedEvent[_event.eventId].slots.push(_slot);
        } else {
          showSnackBar('Select should be in continuous sequence', true);
        }
      }
    } else {
      _selectedEvent[_event.eventId] = {
        slots: [_slot],
      };
    }
    setSelectedEvent(_selectedEvent);
    bounceTimeSlotSelect(_selectedEvent, event);
  };

  const getCurrentSlotsForEvent = (_e) => {
    if (has(selectedEvent[_e.eventId], 'slots')) {
      return selectedEvent[_e.eventId].slots;
    }
    return [];
  };

  return (
    <TimeSelectorContainer>
      {!event ? (
        <EmptyContainer>
          <Text center>Please select a date</Text>
        </EmptyContainer>
      ) : (
        <FlatList
          contentContainerStyle={styles.timelist}
          data={event.events}
          renderItem={({item}) => {
            if (Array.isArray(item.eventSlots)) {
              const _slots: any = sortBy(item.eventSlots, 'slotOrder');
              const eventOffer = OnMeItems.filter((_i) => {
                return _i.id === item.eventType;
              });

              return (
                <EventWrapper>
                  <EventHeader>
                    <LocationWrapper>
                      <Icon
                        name="map-pin-2-line"
                        color={Colors.primary}
                        size={25}
                        onPress={() => {}}
                      />
                      <LocationTextWrapper>
                        <LocationText>{item.location.place}</LocationText>
                      </LocationTextWrapper>
                    </LocationWrapper>
                    {item.eventType !== '' && (
                      <OnMeWrapper>
                        <Icon
                          name="user-smile"
                          color={Colors.primary}
                          size={25}
                          onPress={() => {}}
                        />
                        <OnMeTextWrapper>
                          <OnMeText>On me:</OnMeText>
                        </OnMeTextWrapper>
                        <OnMeTextLight>{eventOffer[0].label}</OnMeTextLight>
                        <OnMeImage source={eventOffer[0].image} />
                      </OnMeWrapper>
                    )}
                  </EventHeader>
                  {_slots.map((_slot: any, index) => (
                    <TimeItem
                      key={index}
                      currentSelected={getCurrentSlotsForEvent(item)}
                      onSelectTime={(_s) => onSelectTime(_s, item)}
                      {..._slot}
                      slotsCount={_slots.length}
                    />
                  ))}
                </EventWrapper>
              );
            }
            return null;
          }}
          keyExtractor={(item: any) => `${item.eventSlots}`}
        />
      )}
      {Object.keys(selectedEvent).length > 0 ? (
        <View>
          <Text size={12} weight="bold" bottom={5} left={20}>
            You Selected Time Slot:{' '}
          </Text>
          <Text left={20} size={12} weight="semibold">
            {getSelectedStartEndTime(selectedEvent)}
          </Text>
          <Seperator height={10} />
        </View>
      ) : null}
    </TimeSelectorContainer>
  );
};

const Screen: React.FunctionComponent<any> = () => {
  const [currentDate, setCurrentDate] = useState<any>();
  const dispatch = useDispatch();
  const user: any = useSelector((state: IRootState) => state.authReducer.user);
  const isFetching: any = useSelector(
    (state: IRootState) => state.authReducer.isFetching,
  );
  const _events = Array.isArray(user.event_data) ? user.event_data : [];
  const _dates: any[] = getDateList(_events);
  const slot = useRef(null);

  const onSlotSelect = (_event) => {
    slot.current = _event;
  };

  useEffect(() => {
    dispatch({type: authTypes.GET_CURRENT_USER});
  }, []);

  useEffect(() => {
    if (!currentDate) {
      if (_dates.length > 0) {
        setCurrentDate(_dates[0]);
      }
    }
  }, [_dates]);

  return (
    <Page>
      <Row align="center">
        <FlatList
          data={_dates}
          horizontal
          ListEmptyComponent={() => <Text>You have no events.</Text>}
          renderItem={({item}) => (
            <DatePickContainer onPress={() => setCurrentDate(item)}>
              <Text center bottom={3}>
                {item.month}
              </Text>
              <DateCircle
                isCurrent={currentDate?.date === item.date ? true : false}>
                <Text center weight="semibold" color={Colors.onPrimary}>
                  {item.date}
                </Text>
              </DateCircle>
              <Seperator height={2} />
              <Text center>{item.day}</Text>
            </DatePickContainer>
          )}
          keyExtractor={(item) => `${item.id}`}
        />
      </Row>
      <Divider />
      {isFetching ? (
        <ActivityIndicator />
      ) : (
        <TimeSelector event={currentDate} bounceTimeSlotSelect={onSlotSelect} />
      )}
    </Page>
  );
};

export default Screen;
