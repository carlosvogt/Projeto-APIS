import React from 'react';
import { useTheme } from '@theme';
import StyledText from '../StyledText';

function Title4({ underlined, color, children, ...rest }) {
  const { colors } = useTheme();

  return (
    <StyledText
      {...rest}
      lineHeight={12}
      fontSize={10}
      color={color || colors.secondary}
      underlined={underlined}
      centered
    >
      {children}
    </StyledText>
  );
}

export default Title4;
