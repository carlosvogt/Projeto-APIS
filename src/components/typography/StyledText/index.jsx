import React from 'react';
import PropTypes from 'prop-types';

import { useTheme } from '@theme';

import { Text } from '../../third-party-components';

function StyledText({
  children,
  family,
  fontSize,
  letterSpacing,
  lineHeight,
  textTransform,
  color,
  centered,
  underlined,
  justify,
  ...rest
}) {
  const { colors, fonts } = useTheme();

  const font = fonts[family];

  const textStyles = [
    {
      fontFamily: font?.fontFamily,
      fontWeight: font?.fontWeight,
      fontSize,
      lineHeight,
      letterSpacing,
      textTransform,
      color: color ?? colors.text,
      textDecorationLine: underlined ? 'underline' : null,
    },
  ];

  if (centered) {
    textStyles.push({ textAlign: 'center' });
  }
  if (justify) {
    textStyles.push({ textAlign: 'justify' });
  }

  return (
    <Text {...rest} style={textStyles}>
      {children}
    </Text>
  );
}

StyledText.propTypes = {
  children: PropTypes.node,
  family: PropTypes.oneOf(['light', 'medium', 'regular', 'thin']),
  fontSize: PropTypes.number,
  letterSpacing: PropTypes.number,
  lineHeight: PropTypes.number,
  textTransform: PropTypes.oneOf([
    'none',
    'capitalize',
    'uppercase',
    'lowercase',
  ]),
  color: PropTypes.string,
  centered: PropTypes.bool,
  justify: PropTypes.bool,
  underlined: PropTypes.bool,
};

StyledText.defaultProps = {
  children: '',
  family: 'regular',
  fontSize: 16,
  letterSpacing: 0,
  lineHeight: 26,
  textTransform: 'none',
  color: undefined,
  centered: false,
  justify: false,
  underlined: false,
};

export default StyledText;
