import React from 'react';
import Svg, { Path } from 'react-native-svg';
import PropTypes from 'prop-types';
import { useTheme } from '@theme';

function Document({ color, size }) {
  const height = size;
  const width = size;
  const { colors } = useTheme();
  return (
    <Svg height={height} viewBox="0 0 24 24" width={width}>
      <Path
        fill={color || colors.reverseBackground}
        d="M6,2A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2H6M6,4H13V9H18V20H6V4M8,12V14H16V12H8M8,16V18H13V16H8Z"
      />
    </Svg>
  );
}
Document.propTypes = {
  size: PropTypes.number,
};

Document.defaultProps = {
  size: 25,
};

export default Document;
