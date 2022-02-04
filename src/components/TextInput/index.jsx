/* eslint-disable sonarjs/cognitive-complexity */
/* eslint-disable no-unused-vars */
import React, { forwardRef, useState, useEffect, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import masks from '@utils/masks';
import { useTheme } from '@theme';
import { useTranslation } from 'react-i18next';
import {
  HelperText,
  TextInput as PaperTextInput,
} from '../third-party-components';

const TextInput = forwardRef(
  (
    {
      name,
      touched,
      errorMessage,
      onBlur,
      label,
      optional,
      icon,
      onPressIcon,
      testIDIcon,
      onChangeText,
      maskType,
      iconColor,
      clearButtonMode,
      style,
      theme,
      inputRef,
      ...rest
    },
    ref,
  ) => {
    const { colors } = useTheme();
    const { t } = useTranslation();
    let varTimeout;
    const mounted = useRef(false);
    const hasError = Boolean(errorMessage);
    const [isFocused, setIsFocused] = useState(false);
    const darkMode = false;
    const styles = StyleSheet.create({
      container: {
        width: '100%',
        marginBottom: 16,
      },
      textInput: {
        borderRadius: 20,
        backgroundColor: colors.secondary,
        overflow: 'hidden',
      },
    });

    const canRenderClearButton =
      clearButtonMode === 'always' &&
      rest.value &&
      rest.value.length > 0 &&
      isFocused &&
      (icon === '' || icon === null);

    useEffect(() => {
      mounted.current = true;
      return () => {
        mounted.current = false;
      };
    });

    const clearFunction = () => {
      clearTimeout(varTimeout);
      onChangeText('');
      setIsFocused(false);
    };

    const renderClearButton = () => {
      if (canRenderClearButton) {
        return (
          <PaperTextInput.Icon
            name="close"
            onPress={() => clearFunction()}
            color={colors.primary}
          />
        );
      }
      return null;
    };

    const onBlurComponent =
      (onBlurParam = () => {}) =>
      (event) => {
        onBlurParam(event);
        if (isFocused) {
          varTimeout = setTimeout(() => {
            if (mounted.current) {
              setIsFocused(false);
            }
          }, 2000);
        }
      };

    const onChangeTextComponent = (event) => {
      if (!isFocused) {
        setIsFocused(true);
      }
      onChangeText(maskType ? masks[maskType](event) : event);
    };

    return (
      <View style={styles.container}>
        <PaperTextInput
          {...rest}
          label={optional ? t('optionalField', { fieldLabel: label }) : label}
          ref={inputRef}
          mode={darkMode ? 'flat' : 'outlined'}
          error={hasError}
          onBlur={onBlurComponent(onBlur)}
          onFocus={() => setIsFocused(true)}
          style={[styles.textInput, style]}
          underlineColor="transparent"
          activeUnderlineColor={colors.error}
          theme={{
            roundness: 20,
            colors: {
              primary: colors.primary,
              text: colors.primary,
              placeholder: colors.primary,
              error: colors.error,
            },
          }}
          onChangeText={onChangeTextComponent}
          right={
            icon !== '' ? (
              <PaperTextInput.Icon
                testID={testIDIcon}
                name={icon}
                onPress={onPressIcon}
                color={iconColor || colors.primary}
                size={30}
              />
            ) : (
              renderClearButton()
            )
          }
        />

        {hasError && (
          <HelperText type="error" style={{ color: colors.error }}>
            {errorMessage}
          </HelperText>
        )}
      </View>
    );
  },
);

TextInput.displayName = 'TextInput';

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  touched: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  errorMessage: PropTypes.string,
  onBlur: PropTypes.func,
  label: PropTypes.string,
  optional: PropTypes.bool,
  icon: PropTypes.string,
  onPressIcon: PropTypes.func,
  testIDIcon: PropTypes.string,
  iconColor: PropTypes.string,
  clearButtonMode: PropTypes.string,
  style: PropTypes.object,
  theme: PropTypes.bool,
};

TextInput.defaultProps = {
  clearButtonMode: 'always',
  style: {},
  theme: false,
  touched: false,
  errorMessage: '',
  onBlur: () => {},
  label: '',
  optional: false,
  icon: '',
  onPressIcon: () => {},
  testIDIcon: 'toggle-icon-button',
  iconColor: '',
};

export default TextInput;
