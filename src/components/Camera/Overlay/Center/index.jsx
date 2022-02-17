import React, { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme } from '@theme';

function Center() {
  const { colors } = useTheme();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.primary,
      marginHorizontal: 46,
      marginBottom: 110,
    },
    row: {
      flex: 1,
      flexDirection: 'row',
    },
    transform: {
      transform: [{ rotateX: '180deg' }, { rotateZ: '180deg' }],
    },
    borderTopContainer: {
      flexDirection: 'row',
      width: '50%',
    },
  });

  const BorderTop = useCallback(({ style }) => {
    return (
      <View style={[styles.borderTopContainer, style]}>
        <View
          style={{
            width: 15,
            height: '25%',
            backgroundColor: colors.primary,
          }}
        />
        <View
          style={{
            height: 15,
            width: '30%',
            backgroundColor: colors.primary,
          }}
        />
      </View>
    );
  }, []);

  const BorderBottom = useCallback(({ style }) => {
    return (
      <View
        style={[
          {
            flexDirection: 'row',
            flex: 1,
            alignItems: 'flex-end',
          },
          style,
        ]}
      >
        <View
          style={{
            height: '25%',
            width: 15,
            backgroundColor: colors.primary,
          }}
        />
        <View
          style={{
            height: 15,
            width: '30%',
            backgroundColor: colors.primary,
          }}
        />
      </View>
    );
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <BorderTop />
        <BorderTop style={styles.transform} />
      </View>
      <View style={styles.row}>
        <BorderBottom />
        <BorderBottom style={styles.transform} />
      </View>
    </View>
  );
}

export default Center;
