import React from 'react';
import Svg, { Path } from 'react-native-svg';
import PropTypes from 'prop-types';
import { useTheme } from '@theme';

function Done({ color, size }) {
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
      <Path d="M0 0h24v24H0V0z" fill="none" />
      <Path d="M9 16.2l-3.5-3.5c-.39-.39-1.01-.39-1.4 0-.39.39-.39 1.01 0 1.4l4.19 4.19c.39.39 1.02.39 1.41 0L20.3 7.7c.39-.39.39-1.01 0-1.4-.39-.39-1.01-.39-1.4 0L9 16.2z" />
    </Svg>
  );
}
Done.propTypes = {
  size: PropTypes.number,
};

Done.defaultProps = {
  size: 25,
};

export default Done;
