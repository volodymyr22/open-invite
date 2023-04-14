import React from 'react';
import {s} from 'react-native-size-matters';
import {Colors} from '@app/themes';
import {useNavigation} from '@react-navigation/native';

import {ButtonContainer} from './styles';
import {Icon} from '@component/shared/stateless';
import {TouchableOpacity} from 'react-native-gesture-handler';

const BackBtn: React.FunctionComponent<any> = (props) => {
  const {color = Colors.darkText, ...rest} = props;
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.goBack()} {...rest}>
      <ButtonContainer>
        <Icon name="arrow-left" size={s(27)} color={color} />
      </ButtonContainer>
    </TouchableOpacity>
  );
};

export default BackBtn;
