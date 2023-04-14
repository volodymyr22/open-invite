import React from 'react';
import {Text, Avatar} from '@component/shared/stateless';

import {NotificationItemProps} from './types';
import {Container, Content} from './styles';

const NotificationItem: React.FunctionComponent<NotificationItemProps> = (
  props,
) => {
  const {imageUrl, status, message, time, ...rest} = props;
  return (
    <Container {...rest}>
      {imageUrl ? (
        <Avatar imageUrl={imageUrl} size="md" availability={status} />
      ) : null}

      <Content>
        <Text bottom={5}>{message}</Text>
        <Text weight="light" fontStyle="italic" size={10}>
          {time}
        </Text>
      </Content>
    </Container>
  );
};

export default NotificationItem;
