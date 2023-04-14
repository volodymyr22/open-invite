import React from 'react';
import {ButtonProps} from './types';
import styles, {ButtonContainer, ButtonText, PRESETS, SIZE} from './styles';
import {Icon} from '@component/shared/stateless';
import {ThemeProvider} from 'styled-components';

const Button: React.FunctionComponent<ButtonProps> = (props) => {
  const {
    preset = 'primary',
    size = 'md',
    fillType = 'fill',
    text,
    style,
    textStyle,
    iconStyles,
    iconName = '',
    ...rest
  } = props;

  if (!text) {
    return null;
  }

  const icon = iconName ? (
    <Icon
      name={iconName}
      size={SIZE.iconSize[size]}
      color={PRESETS[fillType].textColor[preset]}
      style={[styles.icon, iconStyles]}
    />
  ) : null;

  return (
    <ThemeProvider
      theme={{
        preset,
        size,
        fillType,
      }}>
      <ButtonContainer style={{...style}} {...rest}>
        {icon}
        <ButtonText style={{...textStyle}}>{text}</ButtonText>
      </ButtonContainer>
    </ThemeProvider>
  );
};

export default Button;
