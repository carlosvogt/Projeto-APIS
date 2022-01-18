import React from 'react';
import { SafeAreaView as RNSafeAreaView } from 'react-native-safe-area-context';
import PropTypes from 'prop-types';

function SafeAreaView({ children }) {
  return <RNSafeAreaView style={{ flex: 1 }}>{children}</RNSafeAreaView>;
}

SafeAreaView.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SafeAreaView;
