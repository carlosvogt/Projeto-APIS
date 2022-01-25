import React from 'react';
import { useTheme } from '@theme';
import alertPropTypes, { defaultAlertProps } from '../prop-types';
import BaseAlert from '../Base';

function ErrorAlert({ message, autoHide, visible, onHide }) {
  const { colors } = useTheme();
  return (
    <BaseAlert
      bgColor={colors.error}
      textColor={colors.secondary}
      visible={visible}
      autoHide={autoHide}
      message={message}
      onHide={onHide}
    />
  );
}

ErrorAlert.propTypes = alertPropTypes;
ErrorAlert.defaultProps = {
  ...defaultAlertProps,
};

export default ErrorAlert;
