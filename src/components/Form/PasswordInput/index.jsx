import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@theme';
import TextInputForm from '../TextInput';

function PasswordInput({
  secureTextEntry,
  control,
  name,
  errorMessage,
  label,
  ...rest
}) {
  const { colors } = useTheme();
  const [secureText, setSecureText] = useState(secureTextEntry || false);

  const setSecureTextFunction = () => {
    setSecureText(!secureText);
  };
  return (
    <TextInputForm
      {...rest}
      name={name}
      label={label}
      errorMessage={errorMessage}
      control={control}
      textContentType="password"
      secureTextEntry={secureText}
      icon={secureText ? 'eye-off-outline' : 'eye-outline'}
      iconColor={colors.primary}
      onPressIcon={setSecureTextFunction}
    />
  );
}

PasswordInput.propTypes = {
  control: PropTypes.object.isRequired,
  name: PropTypes.string,
  label: PropTypes.string.isRequired,
  errorMessage: PropTypes.string,
  secureTextEntry: PropTypes.bool,
};

PasswordInput.defaultProps = {
  secureTextEntry: true,
  name: 'password',
  errorMessage: '',
};

export default PasswordInput;
