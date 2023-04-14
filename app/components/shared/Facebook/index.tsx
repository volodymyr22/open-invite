import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {TouchableOpacity, ActivityIndicator} from 'react-native';

import {Icon} from '@component/shared/stateless';
import authTypes from '@feature/auth/constants';
import {FacebookButton, FacebookText} from './styles';
import {Colors} from '@app/themes';
import {FacebookProps} from './types';
import {IRootState} from '@app/features/reducers';

const Facebook: React.FunctionComponent<FacebookProps> = (props) => {
  const dispatch = useDispatch();
  const {isFetching} = useSelector((state: IRootState) => state.authReducer);
  const {...rest} = props;

  const loginWithFacebook = () => {
    dispatch({
      type: authTypes.REQUEST_LOGIN,
    });
  };

  return isFetching ? (
    <ActivityIndicator size="large" />
  ) : (
    <TouchableOpacity activeOpacity={0.8} {...rest} onPress={loginWithFacebook}>
      <FacebookButton>
        <Icon name="facebook" size={30} color={Colors.facebookText} />
        <FacebookText>LOGIN WITH FACEBOOK</FacebookText>
      </FacebookButton>
    </TouchableOpacity>
  );
};

export default Facebook;
