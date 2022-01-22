import React from 'react';
import Svg, { Path } from 'react-native-svg';
import PropTypes from 'prop-types';
import { useTheme } from '@theme';

function Trash({ color, size }) {
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
      <Path d="M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-3.5l-1-1zM18 7H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7z" />
    </Svg>
  );
}
Trash.propTypes = {
  size: PropTypes.number,
};

Trash.defaultProps = {
  size: 25,
};

export default Trash;
