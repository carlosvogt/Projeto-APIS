import React from 'react';
import PropTypes from 'prop-types';

import StyledText from '../StyledText';

function Title2({ color, children, ...rest }) {
  return (
    <StyledText
      {...rest}
      lineHeight={16}
      letterSpacing={0.31}
      fontSize={16}
      color={color}
    >
      {children}
    </StyledText>
  );
}

Title2.propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.string,
};

Title2.defaultProps = {
  color: '#E66C00',
};
export default Title2;
