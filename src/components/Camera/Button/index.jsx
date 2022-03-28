import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { useTheme } from '@theme';

function Button({ onPress, loading }) {
  const { colors } = useTheme();
  const styles = StyleSheet.create({
    container: {
      position: 'absolute',
      bottom: 0,
      alignSelf: 'center',
      marginBottom: 17,
      zIndex: 999,
    },
    touchableOpacity: {
      backgroundColor: colors.primary,
      width: 70,
      height: 70,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
    icon: {
      marginHorizontal: 16,
    },
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity
        disabled={loading}
        onPress={() => onPress()}
        style={styles.touchableOpacity}
      >
        <Feather
          style={styles.icon}
          name="camera"
          color={colors.secondary}
          size={30}
        />
      </TouchableOpacity>
    </View>
  );
}

export default Button;
