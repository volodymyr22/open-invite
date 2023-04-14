import React, {useState, useRef} from 'react';
import {Modal, Alert, View} from 'react-native';
import moment from 'moment';
import {FlatList} from 'react-native-gesture-handler';
import {useSelector, useDispatch} from 'react-redux';
import Api from '@api';
import {IRootState} from '@app/features/reducers';
import {sortBy, find, has, findIndex} from 'lodash';

import {convertMsToDateTime} from '@helpers/time';
import {authTypes} from '@feature/constants';
import slotToEventMapper from './../../Transforms/slotToEventMapper';
import {
  Text,
  Seperator,
  Button,
  IconButton,
  Row,
  Icon,
} from '@component/shared/stateless';

import styles, {
  ModalSafeArea,
  DatePickContainer,
  DateCircle,
  Divider,
  TimeContainer,
  TimeSelectorContainer,
  LineItem,
  LineTextContainer,
  EmptyContainer,
  Message,
  MessageWrapper,
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
import {Colors, Constants} from '@app/themes';
import {KeyboardAvoiding} from '../Register/styles';
import showSnackBar from '@app/components/notifications/snackbar';
import {
  getDateList,
  checkIfSlotOrderIsInSequence,
  getSelectedStartEndTime,
} from './functions';
import {OnMeItems} from './options';
const TimeItem = (props) => {
  const {
    slotId,
    status,
    startTime,
    endTime,
    acceptedUserName,
    onSelectTime,
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
        isSelected={find(currentSelected, {slotId: slotId}) ? true : false}
        onPress={() => onSelectTime(props)}>
        <Text weight="semibold" color={Colors.onPrimary}>
          Available
        </Text>
      </LineTextContainer>
    );
  }

  if (acceptedUserName || !available) {
    lineText = (
      <LineTextContainer
        bg={Colors.eventRed}
        onPress={() => Alert.alert('', 'This slot is not available')}>
        <Text weight="semibold" color={Colors.onPrimary}>
          {/* {acceptedUserName} */}
          Not Available
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
  const [selectedEventId, setSelectedEventId] = useState<any>({id: null});
  //let selectedEventId

  const onSelectTime = (_slot, _event) => {
    let _currentEventId = _event.eventId;
    if (selectedEventId.id == null) {
      setSelectedEventId({id: _currentEventId});
    }
    const _selectedEvent = {...selectedEvent};
    if (has(selectedEvent[_event.eventId], 'slots')) {
      const _ids = _selectedEvent[_event.eventId].slots;
      const checkIndex = findIndex(_ids, {slotId: _slot.slotId});
      if (checkIndex >= 0) {
        if (checkIndex === 0) {
          setSelectedEventId({id: null});
        }
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
        if (
          _selectedEvent[_event.eventId].slots.length > 0 ||
          selectedEventId.id == null
        ) {
          if (isInSequence) {
            _selectedEvent[_event.eventId].slots.push(_slot);
          } else {
            showSnackBar('Select should be in continuous sequence', true);
          }
        } else {
          showSnackBar('Select should be in continuous sequence', true);
        }
      }
    } else {
      const checkDifferentEventsSelected =
        selectedEventId.id != null ? true : false;
      if (checkDifferentEventsSelected) {
        showSnackBar('Select should be in continuous sequence', true);
      } else {
        _selectedEvent[_event.eventId] = {
          slots: [_slot],
        };
      }
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
            Selected Time Slot:{' '}
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

const EventTimeline: React.FunctionComponent<any> = (props) => {
  const {events, isVisible, closeModal} = props;
  const [currentDate, setCurrentDate] = useState();
  const [message, setMessage] = useState<string>('');
  const [sending, setSending] = useState<boolean>(false);
  const [currentSlot, setCurrentSlot] = useState(null);
  const _dates: any[] = getDateList(events);
  const user = useSelector((state: IRootState) => state.authReducer.user);
  const dispatch = useDispatch();

  const slot = useRef<any>(null);

  const onSlotSelect = (slots, eventsList) => {
    const result = slotToEventMapper(slots, eventsList);
    setCurrentSlot(result);
    slot.current = result;
  };

  const sendSlot = () => {
    let _event: any = slot.current;
    if (_event) {
      _event = {
        eventRequestVOList: _event,
        acceptedUserId: user.id,
        acceptedUserName: user.name,
        message,
      };
      setSending(true);
      Api.post('/event/joinInvite', _event)
        .then((res) => {
          if (!res.ok) {
            if (Array.isArray(res.data)) {
              if (res.data.length > 0) {
                showSnackBar(
                  res.data[0].message || 'Unable to send invite',
                  true,
                );
                setSending(false);
                return;
              }
            }
            showSnackBar('Unable to send invite', true);
            setSending(false);
            return;
          }
          setSending(false);
          setMessage('');
          showSnackBar("You've successfully requested to join the event");
          dispatch({type: authTypes.GET_CURRENT_USER});
          closeModal();
        })
        .catch((ex) => {
          setSending(false);
          showSnackBar('Unable to send invite', true);
        });
    }
  };

  return (
    <Modal
      animationType="slide"
      visible={isVisible}
      onRequestClose={() => {
        slot.current = null;
        closeModal();
      }}>
      <ModalSafeArea>
        <Row align="center">
          <IconButton
            iconName="close-line"
            size="lg"
            preset="secondary"
            onPress={closeModal}
          />
          <FlatList
            data={_dates}
            horizontal
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
        <KeyboardAvoiding behavior={Constants.KEYBOARD_AVOID}>
          <TimeSelector
            event={currentDate}
            bounceTimeSlotSelect={onSlotSelect}
          />
          {currentSlot ? (
            <MessageWrapper>
              <Text size={12} weight="bold" bottom={5}>
                Send a message along with the request
              </Text>
              <Message value={message} onChangeText={setMessage} />
            </MessageWrapper>
          ) : null}
          <Button text="Send" disabled={sending} onPress={sendSlot} />
        </KeyboardAvoiding>
      </ModalSafeArea>
    </Modal>
  );
};

export default EventTimeline;
