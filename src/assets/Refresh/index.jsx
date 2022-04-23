import React from 'react';
import Svg, { Path } from 'react-native-svg';
import PropTypes from 'prop-types';
import { useTheme } from '@theme';

function Refresh({ color, size }) {
  const height = size;
  const width = size;
  const { colors } = useTheme();
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      height={height}
      width={width}
      fill={color || colors.reverseBackground}
    >
      <Path d="M24 40Q17.35 40 12.675 35.325Q8 30.65 8 24Q8 17.35 12.675 12.675Q17.35 8 24 8Q28.25 8 31.45 9.725Q34.65 11.45 37 14.45V9.5Q37 8.85 37.425 8.425Q37.85 8 38.5 8Q39.15 8 39.575 8.425Q40 8.85 40 9.5V19.2Q40 19.85 39.575 20.275Q39.15 20.7 38.5 20.7H28.8Q28.15 20.7 27.725 20.275Q27.3 19.85 27.3 19.2Q27.3 18.55 27.725 18.125Q28.15 17.7 28.8 17.7H35.7Q33.8 14.7 30.85 12.85Q27.9 11 24 11Q18.55 11 14.775 14.775Q11 18.55 11 24Q11 29.45 14.775 33.225Q18.55 37 24 37Q27.9 37 31.15 34.925Q34.4 32.85 36 29.35Q36.2 28.95 36.65 28.65Q37.1 28.35 37.55 28.35Q38.4 28.35 38.775 28.9Q39.15 29.45 38.85 30.2Q37 34.65 32.975 37.325Q28.95 40 24 40Z" />
    </Svg>
  );
}
Refresh.propTypes = {
  size: PropTypes.number,
};

Refresh.defaultProps = {
  size: 48,
};

export default Refresh;