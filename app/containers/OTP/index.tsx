import React, {useState} from 'react';
import {StatusBar, ActivityIndicator, Alert} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import OTPInputView from '@twotalltotems/react-native-otp-input';

import {Colors, Constants} from '@app/themes';
import {Button, Seperator} from '@component/shared/stateless';
import authTypes from '@feature/auth/constants';
import Api from '@api';

import styles, {
  Page,
  Container,
  Banner,
  Title,
  Description,
  HelpText,
  KeyboardAvoiding,
  SafeArea,
} from './styles';
import {IRootState} from '@app/features/reducers';
import showSnackBar from '@app/components/notifications/snackbar';

const Screen: React.FunctionComponent<any> = () => {
  const [otpCode, setOtpCode] = useState('');
  const dispatch = useDispatch();
  const [resending, setResending] = useState(false);
  const {user, isFetching} = useSelector(
    (state: IRootState) => state.authReducer,
  );

  const verifyOTP = () => {
    const data = {
      cell_phone: user.mobile_number,
      facebook_id: user.facebook_id,
      otp: otpCode,
      user_id: user.id,
    };
    dispatch({type: authTypes.VERIFY_OTP, data});
  };

  const sendOTPAgain = () => {
    setOtpCode('');
    setResending(true);
    const url = `/otp/resend-otp/?userId=${user.id}`;
    Api.post(url, {
      userId: user.id,
    })
      .then((res) => {
        setResending(false);
        if (!res.ok) {
          showSnackBar('Unable to resend OTP');
          return;
        }
        Alert.alert('OTP', 'OTP sent again');
      })
      .catch((ex: any) => {
        console.log(ex);
        setResending(false);
        showSnackBar('Unable to resend OTP');
      });
  };

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
            <Container>
              <Banner />
              <Seperator height={30} />
              <Title>Enter your PIN here</Title>
              <Seperator height={20} />
              <Description>
                We have sent you a message of verification PIN to{' '}
                {user.mobile_number}
              </Description>
              <Seperator height={25} />
              <OTPInputView
                code={otpCode}
                style={styles.otpContainerStyling}
                codeInputFieldStyle={styles.underlineStyleBase}
                codeInputHighlightStyle={styles.underlineStyleHighLighted}
                onCodeChanged={setOtpCode}
                pinCount={4}
                autoFocusOnLoad
              />
              <Seperator height={30} />
              {isFetching ? (
                <ActivityIndicator />
              ) : (
                <Button text="VERIFY" onPress={verifyOTP} />
              )}
              <Seperator height={30} />
              <HelpText>Did not receive the message?</HelpText>
              <Seperator height={10} />
              {resending ? (
                <ActivityIndicator />
              ) : (
                <Button
                  text="Send Again"
                  onPress={sendOTPAgain}
                  fillType="plain"
                  size="sm"
                />
              )}
              <Seperator height={30} />
            </Container>
          </KeyboardAvoiding>
        </SafeArea>
      </Page>
    </>
  );
};

export default Screen;
