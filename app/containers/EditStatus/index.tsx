/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useRef} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {filter} from 'lodash';

import {Button, Text, Seperator} from '@app/components/shared/stateless';
import {Constants} from '@app/themes';
import {eventTypes} from '@feature/constants';
import AccordionRadio from './AccordionRadio';
import {Page, KeyboardAvoiding} from './styles';

import {AvailabilityTypes} from './options';
import {IRootState} from '@app/features/reducers';
import {User} from '@type';

const Screen: React.FunctionComponent<any> = () => {
  const navigation = useNavigation();
  const availabilityRef = useRef<any>();
  const dispatch = useDispatch();
  const user: User = useSelector((state: IRootState) => state.authReducer.user);

  const submitForm = () => {
    if (availabilityRef.current) {
      availabilityRef.current.handleOnSave();
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          text="Save"
          fillType="plain"
          preset="secondary"
          onPress={submitForm}
        />
      ),
    });
  }, []);

  const onSubmit = (values: any) => {
    if (values.availableSoon) {
      dispatch({type: eventTypes.CREATE_EVENT, event: values});
      return;
    }

    if (Array.isArray(user.event_data)) {
      if (filter(user.event_data, {available: true}).length > 0) {
        dispatch({type: eventTypes.UPDATE_EVENT, event: values});
        return;
      }
    }
    dispatch({type: eventTypes.CREATE_EVENT, event: values});
  };

  return (
    <Page>
      <KeyboardAvoiding behavior={Constants.KEYBOARD_AVOID}>
        <Text size={18} weight="bold">
          Current Availability
        </Text>
        <Seperator height={25} />
        <AccordionRadio
          types={AvailabilityTypes}
          innerRef={availabilityRef}
          onSubmit={onSubmit}
        />
      </KeyboardAvoiding>
    </Page>
  );
};

export default Screen;
