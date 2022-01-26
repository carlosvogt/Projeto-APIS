import React from 'react';
import { useTheme } from '@theme';
import StyledText from '../StyledText';

function TitleHeader({ underlined, color, children, ...rest }) {
  const { colors } = useTheme();

  return (
    <StyledText
      {...rest}
      lineHeight={32}
      family="medium"
      fontSize={20}
      color={color || colors.secondary}
      underlined={underlined}
    >
      {children}
    </StyledText>
  );
}

export default TitleHeader;
