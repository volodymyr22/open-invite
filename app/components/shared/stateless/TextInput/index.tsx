import React from 'react';
import styles, {TextGroup, TextWrapper, Error} from './styles';

import {Input, InputProps} from '@ui-kitten/components';

import {Text} from '@component/shared/stateless';
import {Colors} from '@app/themes';

interface Props extends InputProps {
  errorMessage?: string;
}

const TextInput: React.FunctionComponent<Props> = (props) => {
  const {errorMessage} = props;
  return (
    <TextGroup>
      <TextWrapper>
        <Input textStyle={styles.inputText} {...props} size="large" />
      </TextWrapper>
      {errorMessage ? (
        <Error>
          <Text color={Colors.error} size={12}>
            {errorMessage}
          </Text>
        </Error>
      ) : null}
    </TextGroup>
  );
};

export default TextInput;
