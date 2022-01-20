import { useTheme } from '@theme';
import React from 'react';
import { View, StyleSheet } from 'react-native';

function Dot({ isActive }) {
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    container: {
      width: 12,
      height: 12,
      borderRadius: 25,
      backgroundColor: isActive ? colors.primary : colors.secondary,
      borderWidth: isActive ? 0 : 1,
      borderColor: colors.text,
      marginRight: 4,
    },
  });

  return <View style={styles.container} />;
}

export default Dot;
