import React from 'react';
import Svg, { Path } from 'react-native-svg';
import PropTypes from 'prop-types';
import { useTheme } from '@theme';

function Download({ color, size }) {
  const height = size;
  const width = size;
  const { colors } = useTheme();
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={width}
      height={height}
      fill={color || colors.reverseBackground}
    >
      <Path d="M0 0h24v24H0V0z" fill="none" />
      <Path d="M19 9h-4V3H9v6H5l7 7 7-7zm-8 2V5h2v6h1.17L12 13.17 9.83 11H11zm-6 7h14v2H5z" />
    </Svg>
  );
}
Download.propTypes = {
  size: PropTypes.number,
};

Download.defaultProps = {
  size: 25,
};

export default Download;
