import React from 'react';
import Svg, { Path } from 'react-native-svg';
import PropTypes from 'prop-types';
import { useTheme } from '@theme';

function Add({ color, size }) {
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
      <Path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
    </Svg>
  );
}
Add.propTypes = {
  size: PropTypes.number,
};

Add.defaultProps = {
  size: 25,
};

export default Add;
