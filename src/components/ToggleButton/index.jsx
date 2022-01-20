import React from 'react';
import { useTheme } from '@theme';
import ToggleSwitch from 'toggle-switch-react-native';
import { View, StyleSheet } from 'react-native';

function ToggleButton({ isEnabled, setIsEnabled, title }) {
  const { colors } = useTheme();
  const styles = StyleSheet.create({
    container: {
      marginLeft: -8,
    },
  });
  return (
    <View style={styles.container}>
      <ToggleSwitch
        isOn={isEnabled}
        onColor={colors.reverseBackground}
        offColor={colors.reverseBackground}
        label={title}
        labelStyle={{ color: colors.text }}
        onToggle={setIsEnabled}
        circleColor={colors.background}
        size="medium"
      />
    </View>
  );
}

export default ToggleButton;
