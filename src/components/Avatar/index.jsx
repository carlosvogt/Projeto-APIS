import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '@theme';
import { Avatar as PaperAvatar } from '../third-party-components';

function Avatar({ name, image, size }) {
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    container: {
      height: size,
      width: size,
    },
    text: {
      backgroundColor: colors.secondary,
    },
  });

  return (
    <View style={styles.container}>
      {image ? (
        <PaperAvatar.Image size={size} source={image} />
      ) : (
        <PaperAvatar.Text
          size={size}
          label={name.charAt(0).toUpperCase()}
          color={colors.primary}
          style={styles.text}
        />
      )}
    </View>
  );
}

export default Avatar;
