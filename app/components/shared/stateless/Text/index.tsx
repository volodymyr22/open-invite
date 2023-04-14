import React from 'react';
import {TextComp} from './styles';
import {TextCompProps} from './types';
import {ThemeProvider} from 'styled-components';
import {s} from 'react-native-size-matters';
import {Colors} from '@app/themes';

const Text: React.FunctionComponent<TextCompProps> = (props) => {
  const {
    children,
    weight = 'regular',
    family = 'OpenSans',
    fontStyle = 'normal',
    color = Colors.darkText,
    size = 14,
    center,
    bottom = s(0),
    left = s(0),
    style,
    ...rest
  } = props;
  return (
    <ThemeProvider
      theme={{
        weight,
        family,
        fontStyle,
        color,
        size: s(size),
        center,
        bottom,
        left,
        style,
      }}>
      <TextComp style={{...style}} {...rest}>
        {children}
      </TextComp>
    </ThemeProvider>
  );
};

export default Text;
