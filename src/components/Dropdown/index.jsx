/* eslint-disable sonarjs/cognitive-complexity */
/* eslint-disable react/jsx-max-depth */
import React, { useState } from 'react';
import { useTheme } from '@theme';
import { Dropdown } from 'react-native-element-dropdown';
import { StyleSheet, View, Text } from 'react-native';
import { useSelector } from 'react-redux';

function DropdownComponent({
  value,
  setValue,
  data,
  label,
  search,
  searchPlaceholder,
}) {
  const { colors } = useTheme();
  const darkMode = useSelector((state) => state.mode.darkMode);

  const [isFocus, setIsFocus] = useState(false);

  const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.secondary,
      borderTopRightRadius: 20,
      borderTopLeftRadius: 20,
      borderBottomLeftRadius: isFocus ? 0 : 20,
      borderBottomRightRadius: isFocus ? 0 : 20,
      marginBottom: 16,
      borderWidth: darkMode ? 0 : 1,
      borderColor: colors.primary,
    },
    dropdown: {
      height: darkMode ? 65 : 57,
      paddingHorizontal: 13,
      marginTop: (darkMode && isFocus) || (darkMode && value) ? 10 : 0,
      marginBottom: (darkMode && isFocus) || (darkMode && value) ? -10 : 0,
      borderColor: colors.primary,
    },
    label: {
      position: 'absolute',
      backgroundColor: colors.secondary,
      left: 5,
      borderRadius: 20,
      top: darkMode ? 8 : -9,
      zIndex: 999,
      paddingHorizontal: 8,
      fontSize: 12,
      color: colors.primary,
    },
    placeholderStyle: {
      fontSize: 16,
      color: colors.primary,
    },
    iconStyle: {
      width: 20,
      height: 20,
      alignSelf:
        (darkMode && isFocus) || (darkMode && value) ? 'flex-start' : 'center',
    },
    inputSearchStyle: {
      height: 40,
      borderBottomWidth: 0.5,
      borderWidth: 0,
      borderColor: colors.primary,
      fontSize: 16,
    },
    selectedTextStyle: {
      color: colors.primary,
    },
    containerStyle: {
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
      marginTop: darkMode ? -11 : 0,
      borderTopWidth: 0,
      borderRightWidth: darkMode ? 0 : 1,
      borderLeftWidth: darkMode ? 0 : 1,
      borderBottomWidth: darkMode ? 0 : 1,
      borderColor: colors.primary,
    },
  });
  const renderLabel = () => {
    if (value || isFocus) {
      return <Text style={styles.label}>{label}</Text>;
    }
    return null;
  };

  return (
    <View style={styles.container}>
      {renderLabel()}
      <Dropdown
        maxHeight={data.length < 6 ? data.length * 60 : 300}
        activeColor="transparent"
        style={styles.dropdown}
        showsVerticalScrollIndicator={false}
        selectedTextStyle={styles.selectedTextStyle}
        placeholderStyle={styles.placeholderStyle}
        placeholder={isFocus ? '' : label}
        inputSearchStyle={styles.inputSearchStyle}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        iconStyle={styles.iconStyle}
        data={data}
        search={search}
        autoScroll={false}
        labelField="label"
        valueField="value"
        iconColor={colors.primary}
        dropdownPosition="bottom"
        searchPlaceholder={searchPlaceholder}
        value={value}
        containerStyle={styles.containerStyle}
        onChange={(item) => {
          setValue(item.value);
        }}
      />
    </View>
  );
}

export default DropdownComponent;
