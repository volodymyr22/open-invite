import React from 'react';
import {StatusBar} from 'react-native';

import {Facebook} from '@component/shared';
import {Page, FacebookWrap} from './styles';
import {Splash} from '@app/components/shared/stateless';

const Screen: React.FunctionComponent<any> = () => {
  return (
    <Page>
      <StatusBar
        backgroundColor="rgba(255,255,255,0)"
        barStyle="dark-content"
        translucent
      />
      <Splash />
      <FacebookWrap>
        <Facebook />
      </FacebookWrap>
    </Page>
  );
};

export default Screen;
