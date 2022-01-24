import React from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  form: {
    width: '100%',
    flex: 1,
  },
});

function Container({ children }) {
  return <View style={styles.form}>{children}</View>;
}

Container.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Container;
