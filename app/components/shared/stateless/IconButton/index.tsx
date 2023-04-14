import React from 'react';
import {ButtonProps} from './types';
import {ButtonContainer, PRESETS, SIZE} from './styles';
import {Icon} from '@component/shared/stateless';
import {ThemeProvider} from 'styled-components';

const IconButton: React.FunctionComponent<ButtonProps> = (props) => {
  const {
    preset = 'primary',
    size = 'md',
    fillType = 'fill',
    style,
    iconStyles,
    iconName = '',
    ...rest
  } = props;

  if (!iconName) {
    return null;
  }

  return (
    <ThemeProvider
      theme={{
        preset,
        size,
        fillType,
      }}>
      <ButtonContainer style={{...style}} {...rest}>
        <Icon
          name={iconName}
          size={SIZE.iconSize[size]}
          color={PRESETS[fillType].textColor[preset]}
          style={iconStyles}
        />
      </ButtonContainer>
    </ThemeProvider>
  );
};

export default IconButton;
