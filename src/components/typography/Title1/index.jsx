import React from 'react';
import PropTypes from 'prop-types';

import StyledText from '../StyledText';

function Title1({ color, children, ...rest }) {
  return (
    <StyledText
      {...rest}
      lineHeight={26}
      letterSpacing={0.31}
      fontSize={26}
      color={color}
    >
      {children}
    </StyledText>
  );
}

Title1.propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.string,
};

Title1.defaultProps = {
  color: '#E66C00',
};
export default Title1;
