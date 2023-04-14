import React from 'react';
import {BlurView} from '@react-native-community/blur';

import styles, {Page, HeaderLogo, Content, AboutImg, AboutText} from './styles';

const Screen: React.FunctionComponent<any> = () => {
  return (
    <Page>
      <BlurView
        style={styles.absolute}
        blurType="dark"
        blurAmount={10}
        reducedTransparencyFallbackColor="white"
      />
      <HeaderLogo />
      <Content>
        <AboutImg />
        <AboutText>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam, qui
          aspernatur nulla culpa consequatur.
        </AboutText>
      </Content>
    </Page>
  );
};

export default Screen;
