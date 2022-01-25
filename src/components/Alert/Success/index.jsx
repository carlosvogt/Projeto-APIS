import React from 'react';
import { useTheme } from '@theme';
import alertPropTypes, { defaultAlertProps } from '../prop-types';
import BaseAlert from '../Base';

function SuccessAlert({ message, autoHide, visible, onHide }) {
  const { colors } = useTheme();

  return (
    <BaseAlert
      bgColor={colors.success}
      textColor={colors.secondary}
      visible={visible}
      autoHide={autoHide}
      message={message}
      onHide={onHide}
    />
  );
}

SuccessAlert.propTypes = alertPropTypes;
SuccessAlert.defaultProps = {
  ...defaultAlertProps,
};

export default SuccessAlert;
