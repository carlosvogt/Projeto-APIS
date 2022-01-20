import React from 'react';
import { SafeAreaView as RNSafeAreaView } from 'react-native-safe-area-context';

function SafeAreaView({ children }) {
  return <RNSafeAreaView style={{ flex: 1 }}>{children}</RNSafeAreaView>;
}

export default SafeAreaView;
