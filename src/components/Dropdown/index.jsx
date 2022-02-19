/* eslint-disable sonarjs/cognitive-complexity */
/* eslint-disable react/jsx-max-depth */
import React, { useState } from 'react';
import { useTheme } from '@theme';
import { Dropdown } from 'react-native-element-dropdown';
import { StyleSheet, View, Text } from 'react-native';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

function DropdownComponent({
  value,
  setValue,
  data,
  label,
  search,
  searchPlaceholder,
  error,
  mode,
  defaultValue,
}) {
  const { colors } = useTheme();
  const darkMode = useSelector((state) => state.mode.darkMode);

  const [isFocus, setIsFocus] = useState(false);

  const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.secondary,
      borderTopRightRadius: isFocus && mode === 'top' ? 0 : 20,
      borderTopLeftRadius: isFocus && mode === 'top' ? 0 : 20,
      borderBottomLeftRadius: isFocus && mode === 'bottom' ? 0 : 20,
      borderBottomRightRadius: isFocus && mode === 'bottom' ? 0 : 20,
      marginVertical: 14,
      borderWidth: darkMode ? 0 : 1,
      borderColor: error ? colors.error : colors.primary,
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
      color: error ? colors.error : colors.primary,
    },
    placeholderStyle: {
      fontSize: 16,
      color: error ? colors.error : colors.primary,
    },
    iconStyle: {
      width: 20,
      height: 20,
      alignSelf:
        (darkMode && isFocus) || (darkMode && value) ? 'flex-start' : 'center',
    },
    inputSearchStyle: {
      height: 40,
      borderBottomWidth: mode === 'top' ? 0 : 0.5,
      borderTopWidth: mode === 'bottom' ? 0 : 0.5,
      borderWidth: 0,
      borderColor: colors.primary,
      fontSize: 16,
    },
    selectedTextStyle: {
      color: colors.primary,
    },
    containerStyle: {
      borderBottomLeftRadius: mode === 'top' ? 0 : 20,
      borderBottomRightRadius: mode === 'top' ? 0 : 20,
      borderTopRightRadius: mode === 'bottom' ? 0 : 20,
      borderTopLeftRadius: mode === 'bottom' ? 0 : 20,
      marginTop: darkMode ? -11 : 0,
      borderRightWidth: darkMode ? 0 : 1,
      borderLeftWidth: darkMode ? 0 : 1,
      borderBottomWidth: darkMode && mode === 'bottom' ? 0 : 1,
      borderTopWidth: mode === 'top' && !darkMode ? 1 : 0,
      borderColor: colors.primary,
    },
    error: {
      top: -8,
      paddingHorizontal: 11,
      fontSize: 12,
      color: colors.error,
    },
  });
  const renderLabel = () => {
    if (value || isFocus) {
      return <Text style={styles.label}>{label}</Text>;
    }
    return null;
  };

  const renderError = () => {
    if (error) {
      return <Text style={styles.error}>{error}</Text>;
    }
    return null;
  };

  return (
    <>
      <View style={styles.container}>
        {renderLabel()}
        <Dropdown
          maxHeight={data.length < 6 ? data.length * 60 : 300}
          activeColor="transparent"
          style={styles.dropdown}
          showsVerticalScrollIndicator={false}
          selectedTextStyle={styles.selectedTextStyle}
          placeholderStyle={styles.placeholderStyle}
          placeholder={isFocus ? '' : defaultValue || label}
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
          dropdownPosition={mode}
          searchPlaceholder={searchPlaceholder}
          value={value}
          containerStyle={styles.containerStyle}
          onChange={(item) => {
            setValue(item.value);
          }}
        />
      </View>
      {renderError()}
    </>
  );
}
DropdownComponent.propTypes = {
  mode: PropTypes.string,
};

DropdownComponent.defaultProps = {
  mode: 'bottom',
};

export default DropdownComponent;
