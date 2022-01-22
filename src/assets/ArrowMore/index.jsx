import React from 'react';
import Svg, { Path } from 'react-native-svg';
import PropTypes from 'prop-types';
import { useTheme } from '@theme';

function ArrowMore({ color, size }) {
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
      <Path d="M9.29 6.71c-.39.39-.39 1.02 0 1.41L13.17 12l-3.88 3.88c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0l4.59-4.59c.39-.39.39-1.02 0-1.41L10.7 6.7c-.38-.38-1.02-.38-1.41.01z" />
    </Svg>
  );
}
ArrowMore.propTypes = {
  size: PropTypes.number,
};

ArrowMore.defaultProps = {
  size: 25,
};

export default ArrowMore;
