/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useRef} from 'react';
import {Switch, View} from 'react-native';
import {has} from 'lodash';
import {useSelector, useDispatch} from 'react-redux';
import {Formik} from 'formik';
import {useNavigation} from '@react-navigation/native';
import CheckBox from 'react-native-check-box';

import {
  Text,
  TextInput,
  Seperator,
  Button,
  Row,
  Icon,
  RadioGroup,
  ItemSeperator,
} from '@app/components/shared/stateless';
import {Page, KeyboardAvoiding} from './styles';
import {Constants, Colors} from '@app/themes';
import {s} from 'react-native-size-matters';
import {IRootState} from '@app/features/reducers';
import authTypes from '@feature/auth/constants';
import EditAvatar from './EditAvatar';
import Chat from '@helpers/chat';

import CountrySelect from './CountrySelect';
import StateSelect from './StateSelect';
import Interests from './Interests';
import styles from './styles';

const Screen: React.FunctionComponent<any> = (props) => {
  const navigation = useNavigation();
  const {route} = props;
  const {user} = useSelector((state: IRootState) => state.authReducer);
  const location = useSelector(
    (state: IRootState) => state.globalReducer.location,
  );
  const dispatch = useDispatch();
  const formRef = useRef<any>();
  const pageRef = useRef<any>();

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

    if (has(route, 'params.scrollToEnd') && pageRef) {
      if (pageRef.current) {
        pageRef.current.scrollToEnd();
      }
    }
  }, []);

  const submitForm = () => {
    if (formRef.current) {
      formRef.current.handleSubmit();
    }
  };

  const onSumbit = (values: any) => {
    const _user = {
      ...user,
      ...values,
      latitude: location ? location.latitude : user.latitude,
      longitude: location ? location.longitude : user.longitude,
      user_privacy_setting: {
        ...user.user_privacy_setting,
        ...values.user_privacy_setting,
      },
    };

    if (user.name !== values.name) {
      Chat.changeUserName(user.id, _user);
    }
    dispatch({type: authTypes.UPDATE_USER, user: _user, showAlert: true});
  };

  const getLocationPerference = (values: any) => {
    if (values.exact_location) {
      return 'user_privacy_setting.exact_location';
    }
    if (values.mile_radius) {
      return 'user_privacy_setting.mile_radius';
    }
    return 'user_privacy_setting.mile_radius';
  };

  if (!user.user_privacy_setting) {
    return null;
  }

  return (
    <KeyboardAvoiding behavior={Constants.KEYBOARD_AVOID}>
      <Page ref={pageRef}>
        <Row justify="center">
          <EditAvatar imageUrl={user.profile_picture} />
        </Row>
        <Seperator height={25} />
        <Text weight="bold" size={16}>
          Personal Information
        </Text>
        <Seperator height={20} />
        <Formik
          innerRef={(instance: any) => (formRef.current = instance)}
          style={styles.formContainer}
          initialValues={{
            name: user.name,
            country: user.country,
            state: user.state,
            whats_on_your_mind: user.whats_on_your_mind,
            interest: user.interest || [],
            user_privacy_setting: {
              show_my_location: user.user_privacy_setting.show_my_location,
              invisible_mode: user.user_privacy_setting?.invisible_mode,
              people_with_similar_interest:
                user.user_privacy_setting?.people_with_similar_interest,
              exact_location: user.user_privacy_setting?.exact_location,
              mile_radius: user.user_privacy_setting?.mile_radius,
            },
          }}
          onSubmit={onSumbit}>
          {({handleChange, handleBlur, values, setFieldValue}) => (
            <>
              <TextInput
                placeholder="Full Name"
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                value={values.name}
                returnKeyType="next"
              />
              <CountrySelect
                value={values.country}
                onChange={(name) => setFieldValue('country', name)}
              />
              <Seperator height={12} />
              <StateSelect
                country={values.country}
                value={values.state}
                onChange={(name) => setFieldValue('state', name)}
              />
              <Seperator height={12} />
              <TextInput
                placeholder="What's on your mind?"
                onChangeText={handleChange('whats_on_your_mind')}
                onBlur={handleBlur('whats_on_your_mind')}
                value={values.whats_on_your_mind}
                returnKeyType="next"
              />
              <Interests
                value={values.interest}
                onChange={(_val) => setFieldValue('interest', _val)}
              />
              <Seperator height={12} />
              <ItemSeperator />
              <Seperator height={30} />
              <Row align="center" justify="space-between" bottom={10}>
                <Text weight="semibold">Show my location</Text>
                <Switch
                  trackColor={{false: '#767577', true: Colors.primary}}
                  thumbColor={
                    values.user_privacy_setting.show_my_location
                      ? '#f4f3f4'
                      : '#f4f3f4'
                  }
                  ios_backgroundColor={Colors.onSurface}
                  onValueChange={(value) =>
                    setFieldValue(
                      'user_privacy_setting.show_my_location',
                      value,
                    )
                  }
                  value={values.user_privacy_setting.show_my_location}
                />
              </Row>
              {values.user_privacy_setting.show_my_location ? (
                <>
                  <View>
                    <RadioGroup
                      data={[
                        {
                          id: 'user_privacy_setting.exact_location',
                          label: 'Exact Location',
                          description:
                            'For this we will use your GPS location to share location.',
                        },
                        {
                          id: 'user_privacy_setting.mile_radius',
                          label: '1 mile radius',
                          description:
                            'This will not show your exact location.',
                        },
                      ]}
                      onChange={(result: any[]) => {
                        result.forEach((item: any) => {
                          setFieldValue(item.id, item.value);
                        });
                      }}
                      value={getLocationPerference(values.user_privacy_setting)}
                    />
                  </View>
                  <Seperator height={5} />
                  <ItemSeperator />
                </>
              ) : null}

              <Seperator height={30} />
              <View>
                <Row align="center" justify="space-between" bottom={5}>
                  <Text weight="semibold">
                    Show people with similar interests
                  </Text>
                  <CheckBox
                    onClick={() => {
                      setFieldValue(
                        'user_privacy_setting.people_with_similar_interest',
                        !values.user_privacy_setting
                          .people_with_similar_interest,
                      );
                    }}
                    checkedImage={
                      <Icon
                        name="checkbox-fill"
                        size={s(25)}
                        color={Colors.primary}
                      />
                    }
                    unCheckedImage={
                      <Icon
                        name="checkbox-blank-line"
                        size={s(25)}
                        color={Colors.onSurface}
                      />
                    }
                    isChecked={
                      values.user_privacy_setting.people_with_similar_interest
                    }
                  />
                </Row>
                <Text weight="light" size={12}>
                  If you don't want to see anyone outside your friends lists
                  then you can disable this suggestion.
                </Text>
              </View>
              <Seperator height={15} />
              <View>
                <Row align="center" justify="space-between" bottom={5}>
                  <Text weight="semibold">Invisible Mode</Text>
                  <Switch
                    trackColor={{false: '#767577', true: Colors.primary}}
                    thumbColor={
                      values.user_privacy_setting.invisible_mode
                        ? '#f4f3f4'
                        : '#f4f3f4'
                    }
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={(value) =>
                      setFieldValue(
                        'user_privacy_setting.invisible_mode',
                        value,
                      )
                    }
                    value={values.user_privacy_setting.invisible_mode}
                  />
                </Row>
                <Text weight="light" size={12}>
                  This mode will not show you on Open Invite but you can still
                  send join requests but you will not receive requests.
                </Text>
              </View>
            </>
          )}
        </Formik>
      </Page>
    </KeyboardAvoiding>
  );
};

export default Screen;
