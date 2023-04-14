import React, {useEffect} from 'react';
import {StatusBar, ActivityIndicator} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {has} from 'lodash';

import {Formik} from 'formik';
import * as Yup from 'yup';
import {useNavigation} from '@react-navigation/native';

import {
  Button,
  TextInput,
  Seperator,
  BackBtn,
  LoadingLayout,
} from '@component/shared/stateless';

import {
  Page,
  SafeArea,
  Wrapper,
  Title,
  KeyboardAvoiding,
  HeaderLeft,
  HeaderTitle,
} from './styles';
import {Colors, Constants} from '@app/themes';

import {logoutFromFacebook} from './functions';
import {IRootState} from '@app/features/reducers';
import {User} from '@type';
import authTypes from '@feature/auth/constants';
import Chat from '@helpers/chat';

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Requires a min of 2 characters')
    .max(50, 'Max is upto 50 characters')
    .required('Your name is Required'),
  email: Yup.string().email('Invalid Email').required('Email is required'),
  mobile_number: Yup.string()
    .matches(phoneRegExp, 'Mobile number is not valid')
    .required('Mobile number is required'),
});

const Screen: React.FunctionComponent<any> = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {user, isFetching} = useSelector(
    (state: IRootState) => state.authReducer,
  );

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <HeaderLeft>
          <BackBtn onPress={() => logoutFromFacebook(dispatch)} />
          <HeaderTitle>Let's get started</HeaderTitle>
        </HeaderLeft>
      ),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSumbit = (values: any) => {
    const _user: User = {
      ...user,
      ...values,
    };
    if (user.name !== values.name) {
      Chat.changeUserName(user.id, _user);
    }
    dispatch({type: authTypes.REGISTER_USER, user: _user});
  };

  if (!has(user, 'id')) {
    return <LoadingLayout />;
  }
  if (user.otp_verified) {
    return <LoadingLayout />;
  }

  return (
    <>
      <StatusBar
        backgroundColor={Colors.primary}
        barStyle={Constants.STATUS_BAR}
        translucent={false}
      />
      <Page>
        <SafeArea>
          <KeyboardAvoiding behavior={Constants.KEYBOARD_AVOID}>
            <Wrapper>
              <Title>Please fill the information</Title>
              <Seperator height={35} />
              <Formik
                initialValues={{
                  name: user.name,
                  email: user.email,
                  mobile_number: user.mobile_number,
                }}
                validationSchema={SignupSchema}
                onSubmit={onSumbit}>
                {({
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  values,
                  errors,
                  touched,
                }) => (
                  <>
                    <TextInput
                      onChangeText={handleChange('name')}
                      onBlur={handleBlur('name')}
                      value={values.name}
                      placeholder="Full Name"
                      returnKeyType="next"
                      errorMessage={
                        errors.name && touched.name ? errors.name : ''
                      }
                    />
                    <TextInput
                      onChangeText={handleChange('email')}
                      onBlur={handleBlur('email')}
                      value={values.email}
                      placeholder="Email Address"
                      returnKeyType="next"
                      disabled={true}
                      errorMessage={
                        errors.email && touched.email ? errors.email : ''
                      }
                    />
                    <TextInput
                      onChangeText={handleChange('mobile_number')}
                      onBlur={handleBlur('mobile_number')}
                      value={values.mobile_number}
                      placeholder="Mobile Number"
                      returnKeyType="next"
                      keyboardType="phone-pad"
                      errorMessage={
                        errors.mobile_number && touched.mobile_number
                          ? errors.mobile_number
                          : ''
                      }
                    />
                    <Seperator height={15} />
                    {isFetching ? (
                      <ActivityIndicator />
                    ) : (
                      <Button onPress={handleSubmit} text="Submit" />
                    )}
                  </>
                )}
              </Formik>
            </Wrapper>
          </KeyboardAvoiding>
        </SafeArea>
      </Page>
    </>
  );
};

export default Screen;
