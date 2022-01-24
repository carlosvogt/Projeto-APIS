import React from 'react';
import { View } from 'react-native';
import { Controller } from 'react-hook-form';
import PropTypes from 'prop-types';

import TextInput from '@components/TextInput';

function TextInputForm({
  iconColor,
  control,
  name,
  error,
  label,
  maskType,
  ...rest
}) {
  return (
    <View>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value, onBlur } }) => (
          <TextInput
            {...rest}
            onChangeText={onChange}
            value={value}
            label={label}
            name={name}
            onBlur={onBlur}
            maskType={maskType}
            iconColor={iconColor}
          />
        )}
      />
    </View>
  );
}

TextInputForm.propTypes = {
  control: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  error: PropTypes.string,
  maskType: PropTypes.string,
  iconColor: PropTypes.string,
};

TextInputForm.defaultProps = {
  error: '',
  maskType: '',
  iconColor: '',
  label: '',
};

export default TextInputForm;
