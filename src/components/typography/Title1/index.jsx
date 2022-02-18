import React from 'react';
import { useTheme } from '@theme';
import StyledText from '../StyledText';

function Title1({ underlined, color, children, ...rest }) {
  const { colors } = useTheme();

  return (
    <StyledText
      {...rest}
      lineHeight={36}
      letterSpacing={0.31}
      fontSize={26}
      color={color || colors.text}
      underlined={underlined}
    >
      {children}
    </StyledText>
  );
}

export default Title1;
