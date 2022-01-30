import React from 'react';
import { useTheme } from '@theme';
import StyledText from '../StyledText';

function Title3({ underlined, color, children, ...rest }) {
  const { colors } = useTheme();

  return (
    <StyledText
      {...rest}
      lineHeight={20}
      letterSpacing={0.31}
      family="medium"
      fontSize={16}
      color={color || colors.text}
      underlined={underlined}
    >
      {children}
    </StyledText>
  );
}

export default Title3;
