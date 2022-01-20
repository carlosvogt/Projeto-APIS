import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme } from '@theme';

function Container({ children, style }) {
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      margin: 16,
      backgroundColor: colors.background,
    },
  });

  return <View style={[styles.container, style]}>{children}</View>;
}

export default Container;
