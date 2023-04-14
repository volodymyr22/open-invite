import React from 'react';
import {ActivityIndicator} from 'react-native';
import FastImage from 'react-native-fast-image';
import styles, {Wrapper, Container, Status, IsLoading} from './styles';

import {AvatarProps} from './types';
import {Colors} from '@app/themes';

const Avatar: React.FunctionComponent<AvatarProps> = (props) => {
  const {
    size = 'md',
    imageUrl = 'https://picsum.photos/150?blur=9',
    availability,
    isLoading,
    ...rest
  } = props;

  return (
    <Wrapper size={size} {...rest}>
      <Container size={size}>
        <FastImage
          style={styles.container}
          source={{uri: imageUrl, priority: FastImage.priority.high}}
        />
        {isLoading ? (
          <IsLoading size={size}>
            <ActivityIndicator color={Colors.background} />
          </IsLoading>
        ) : null}
      </Container>
      {availability ? <Status status={availability} size={size} /> : null}
    </Wrapper>
  );
};

export default Avatar;
