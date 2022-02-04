import React from 'react';
import { useTheme } from '@theme';
import StyledText from '../StyledText';

function Title4({ underlined, color, children, ...rest }) {
  const { colors } = useTheme();

  return (
    <StyledText
      {...rest}
      lineHeight={20}
      fontSize={20}
      color={color || colors.secondary}
      underlined={underlined}
    >
      {children}
    </StyledText>
  );
}

export default Title4;
