import React from 'react';
import Svg, { Path } from 'react-native-svg';
import PropTypes from 'prop-types';
import { useTheme } from '@theme';

function ArrowDown({ color, size }) {
  const height = size;
  const width = size;
  const { colors } = useTheme();
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      height={height}
      viewBox="0 0 24 24"
      width={width}
      fill={color || colors.reverseBackground}
    >
      <Path d="M24 24H0V0h24v24z" fill="none" opacity=".87" />
      <Path d="M15.88 9.29L12 13.17 8.12 9.29c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41l4.59 4.59c.39.39 1.02.39 1.41 0l4.59-4.59c.39-.39.39-1.02 0-1.41-.39-.38-1.03-.39-1.42 0z" />
    </Svg>
  );
}
ArrowDown.propTypes = {
  size: PropTypes.number,
};

ArrowDown.defaultProps = {
  size: 25,
};

export default ArrowDown;
