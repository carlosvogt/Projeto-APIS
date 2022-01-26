import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';

const TouchableDebounce = ({
  onPress,
  children,
  debounceTime,
  debounceMaxWait,
  ...props
}) => {
  return (
    <TouchableOpacity onPress={onPress} {...props}>
      {children}
    </TouchableOpacity>
  );
};

TouchableDebounce.propTypes = {
  onPress: PropTypes.func,
  children: PropTypes.node,
};

TouchableDebounce.defaultProps = {
  onPress: () => {},
  children: [],
};

export default TouchableDebounce;
