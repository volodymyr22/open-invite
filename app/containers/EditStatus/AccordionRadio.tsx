/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect, useRef} from 'react';
import {useSelector} from 'react-redux';
import {s} from 'react-native-size-matters';
import {has} from 'lodash';

import {Formik} from 'formik';
import moment from 'moment';

import {
  Text,
  Icon,
  Row,
  Seperator,
  PlacesAutoComplete,
  DatePicker,
} from '@app/components/shared/stateless';
import {Colors} from '@app/themes';
import {IRootState} from '@app/features/reducers';
import {AVAILABILITY} from '@type';

import OnMeList from './OnMeList';
import styles, {
  AccordionContainer,
  AccordionHeader,
  AccordionContent,
} from './styles';
import {convertMsToDateTime} from '@app/helpers/time';

const getRoundedMinutes = () => {
  const start = moment();
  const remainder = start.minute() % 30;
  const dateTime = moment(start).subtract(remainder, 'minutes');

  return dateTime;
};

const OpenNow: React.FunctionComponent<any> = (props) => {
  const {outerRef, currentEvent} = props;
  const user = useSelector((state: IRootState) => state.authReducer.user);
  const formRef = useRef<any>();

  useEffect(() => {
    outerRef.current = formRef.current;
  }, []);

  const _currentEvent = currentEvent.available ? currentEvent : {};

  let _startdateTime: any = getRoundedMinutes();
  let _enddateTime: any = getRoundedMinutes().add('hour', 1);

  if (_currentEvent.startTime || _currentEvent.endTime) {
    const _datetime = convertMsToDateTime(
      _currentEvent.startTime,
      _currentEvent.endTime,
    );
    _startdateTime = moment(_datetime.start).toDate();
    _enddateTime = moment(_datetime.end).toDate();
  }

  return (
    <AccordionContent>
      <Formik
        innerRef={(instance: any) => (formRef.current = instance)}
        initialValues={{
          location: {
            place: has(_currentEvent, 'location.place')
              ? _currentEvent.location.place
              : null,
            latitude: has(_currentEvent, 'location.latitude')
              ? _currentEvent.location.latitude
              : null,
            longitude: has(_currentEvent, 'location.longitude')
              ? _currentEvent.location.longitude
              : null,
          },
          createdUserFacebookId: user.facebook_id,
          createdUserId: user.id,
          createdUserName: user.name,
          available: true,
          availableSoon: false,
          availabilityStatus: AVAILABILITY.AVAILABLE_NOW,
          fireBaseId: user.firebase_id,
          eventType: _currentEvent?.eventType || '',
          endTime: _enddateTime,
          startTime: _startdateTime,
          eventId: _currentEvent?.eventId || null,
        }}
        onSubmit={props.onSubmit}>
        {({values, setFieldValue}) => (
          <>
            <PlacesAutoComplete
              value={values.location}
              useCurrent
              onLocationSelected={(geometry: any) => {
                setFieldValue('location.place', geometry.name);
                setFieldValue('location.latitude', geometry.lat);
                setFieldValue('location.longitude', geometry.lng);
              }}
            />
            <Seperator height={25} />
            <DatePicker
              mode="time"
              format="LT"
              minDate={moment(_startdateTime).add('minutes', 30).toDate()}
              maxDate={moment(_startdateTime).add('hours', 1).toDate()}
              cancelBtnText="Cancel"
              date={values.endTime}
              placeholder="Open Till"
              confirmBtnText="Set"
              onDateChange={(_date) => setFieldValue('endTime', _date)}
              style={styles.datePickerStyle}
              customStyles={{
                dateInput: styles.dateInput,
                dateText: styles.dateText,
                placeholderText: styles.placeholderText,
              }}
            />
            <Seperator height={20} />
            <OnMeList
              value={values.eventType}
              onChange={(_types) => setFieldValue('eventType', _types)}
            />
          </>
        )}
      </Formik>
    </AccordionContent>
  );
};

const OpenLater: React.FunctionComponent<any> = (props) => {
  const {outerRef} = props;
  const user = useSelector((state: IRootState) => state.authReducer.user);
  const formRef = useRef<any>();

  useEffect(() => {
    outerRef.current = formRef.current;
  }, []);

  const _currentEvent: any = {};

  let _startdateTime: any = null;
  let _enddateTime: any = null;

  if (_currentEvent.startTime || _currentEvent.endTime) {
    const _datetime = convertMsToDateTime(
      _currentEvent.startTime,
      _currentEvent.endTime,
    );
    _startdateTime = moment(_datetime.start);
    _enddateTime = moment(_datetime.end);
  }

  return (
    <AccordionContent>
      <Formik
        innerRef={(instance: any) => (formRef.current = instance)}
        initialValues={{
          location: {
            place: has(_currentEvent, 'location.place')
              ? _currentEvent.location.place
              : null,
            latitude: has(_currentEvent, 'location.latitude')
              ? _currentEvent.location.latitude
              : null,
            longitude: has(_currentEvent, 'location.longitude')
              ? _currentEvent.location.longitude
              : null,
          },
          createdUserFacebookId: user.facebook_id,
          createdUserId: user.id,
          createdUserName: user.name,
          available: false,
          availableSoon: true,
          availabilityStatus: AVAILABILITY.AVAILABLE_LATER,
          fireBaseId: user.firebase_id,
          endTime: _enddateTime || 0,
          startTime: _startdateTime || 0,
          eventType: _currentEvent?.eventType || '',
          eventId: _currentEvent?.eventId || null,
        }}
        onSubmit={props.onSubmit}>
        {({setFieldValue, values}) => (
          <>
            <PlacesAutoComplete
              value={values.location}
              onLocationSelected={(geometry: any) => {
                setFieldValue('location.place', geometry.name);
                setFieldValue('location.latitude', geometry.lat);
                setFieldValue('location.longitude', geometry.lng);
              }}
            />
            <Seperator height={25} />
            {/* <Row> */}
            <DatePicker
              mode="datetime"
              format="DD/MM/YYYY LT"
              minDate={moment(getRoundedMinutes()).toDate()}
              style={styles.datePickerStyle}
              cancelBtnText="Cancel"
              date={values.startTime}
              placeholder="Start Date & Time"
              confirmBtnText="Set"
              onDateChange={(_date) => setFieldValue('startTime', _date)}
              customStyles={{
                dateInput: styles.dateInput,
                dateText: styles.dateText,
                placeholderText: styles.placeholderText,
              }}
            />
            <Seperator height={30} />
            <DatePicker
              mode="datetime"
              format="DD/MM/YYYY LT"
              minDate={
                values.startTime
                  ? moment(values.startTime).add('minutes', 30).toDate()
                  : moment(getRoundedMinutes()).add('minutes', 30).toDate()
              }
              maxDate={moment(
                values.startTime ? values.startTime : getRoundedMinutes(),
              )
                .endOf('day')
                .add('minute', 1)
                .toDate()}
              cancelBtnText="Cancel"
              date={
                values.endTime
                  ? values.endTime
                  : values.startTime
                  ? moment(values.startTime).add('minutes', 30).toDate()
                  : null
              }
              placeholder="End Date & Time"
              confirmBtnText="Set"
              onDateChange={(_date) => setFieldValue('endTime', _date)}
              style={styles.datePickerStyle}
              customStyles={{
                dateInput: styles.dateInput,
                dateText: styles.dateText,
                placeholderText: styles.placeholderText,
              }}
            />
            {/* </Row> */}
            <Seperator height={20} />
            <OnMeList
              value={values.eventType}
              onChange={(_types) => setFieldValue('eventType', _types)}
            />
          </>
        )}
      </Formik>
    </AccordionContent>
  );
};

const NotOpen: React.FunctionComponent<any> = (props) => {
  const {outerRef, onSubmit, currentEvent} = props;
  const user = useSelector((state: IRootState) => state.authReducer.user);

  useEffect(() => {
    outerRef.current = {
      handleSubmit: () => {
        onSubmit({
          location: {
            latitude: '',
            longitude: '',
          },
          createdUserFacebookId: user.facebook_id,
          createdUserId: user.id,
          createdUserName: user.name,
          available: false,
          availableSoon: false,
          availabilityStatus: AVAILABILITY.NOT_AVAILABLE,
          fireBaseId: user.firebase_id,
          startTime: 0,
          endTime: 0,
          eventId: currentEvent?.eventId || null,
        });
      },
    };
  }, []);
  return null;
};

const contentForSelected = (currentSelected: string, options: any) => {
  return (props: any) => {
    if (currentSelected && options.id === AVAILABILITY.AVAILABLE_NOW) {
      return <OpenNow {...props} {...options} />;
    } else if (currentSelected && options.id === AVAILABILITY.AVAILABLE_LATER) {
      return <OpenLater {...props} {...options} />;
    } else {
      return <NotOpen {...props} {...options} />;
    }
  };
};

const AccordionItem: React.FunctionComponent<any> = (props) => {
  const {isSelected, onSelect, currentFormRef, onSubmit} = props;
  const Content = contentForSelected(isSelected, props);
  const outerRef = useRef<any>();

  useEffect(() => {
    if (currentFormRef) {
      currentFormRef.current = outerRef.current;
    }
  }, [isSelected]);

  return (
    <AccordionContainer>
      <AccordionHeader onPress={() => onSelect(props.id)}>
        <Row justify="space-between">
          <Text>{props.label}</Text>
          <Icon
            size={s(24)}
            color={Colors.primary}
            name={isSelected ? 'radio-f' : 'checkbox-blank-circle-line'}
          />
        </Row>
      </AccordionHeader>
      <Content onSubmit={onSubmit} outerRef={outerRef} />
    </AccordionContainer>
  );
};

const AccordionRadio: React.FunctionComponent<any> = (props) => {
  const [selectedAvailId, setSelectedAvailId] = useState('');
  const {types, innerRef, onSubmit} = props;
  const user: any = useSelector((state: IRootState) => state.authReducer.user);
  const currentFormRef = useRef<any>();
  const [currentEvent, setCurrentEvent] = useState<Event>({});

  const submitInnerForm = () => {
    if (currentFormRef.current) {
      currentFormRef.current.handleSubmit();
    }
  };

  const getEventStatusString = (available, availableSoon) => {
    if (availableSoon) {
      return AVAILABILITY.AVAILABLE_LATER;
    }
    if (available) {
      return AVAILABILITY.AVAILABLE_NOW;
    }
    return AVAILABILITY.NOT_AVAILABLE;
  };

  const getCurrentEventData = () => {
    if (Array.isArray(user.event_data)) {
      if (user.event_data.length > 0) {
        const _eventData = user.event_data[0];
        setSelectedAvailId(
          getEventStatusString(_eventData.available, _eventData.availableSoon),
        );
        setCurrentEvent(user.event_data[0]);
      }
    }
  };

  useEffect(() => {
    if (innerRef) {
      innerRef.current = {
        handleOnSave: submitInnerForm,
      };
    }

    getCurrentEventData();
  }, []);

  return types.map((openType: any) => (
    <AccordionItem
      {...openType}
      key={openType.id}
      isSelected={selectedAvailId === openType.id}
      onSelect={setSelectedAvailId}
      currentFormRef={selectedAvailId === openType.id ? currentFormRef : null}
      onSubmit={onSubmit}
      currentEvent={currentEvent}
    />
  ));
};

export default AccordionRadio;
