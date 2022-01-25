import React, { createContext, useCallback, useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

import AlertFactory, { MessageTypes } from './AlertFactory';

const ToastContext = createContext();

function useToast() {
  const toast = useContext(ToastContext);

  if (!toast) {
    throw new Error('useToast must be used within a ToastProvider');
  }

  return toast;
}

function ToastProvider({ children }) {
  const { t } = useTranslation();
  const [alert, setAlert] = useState(null);

  const removeToast = useCallback(() => setAlert(null), []);

  const addToast = useCallback((config) => setAlert(config), []);

  const toast = useCallback(
    ({ type, message }) => {
      const config = { type, message };
      addToast(config);
    },
    [addToast],
  );

  toast.exception = useCallback(
    (exception) => {
      const message = t(exception?.message ?? 'genericException');
      addToast({ type: MessageTypes.ERROR, message });
    },
    [addToast, t],
  );

  toast.error = useCallback(
    (message) => {
      addToast({ type: MessageTypes.ERROR, message });
    },
    [addToast],
  );

  toast.success = useCallback(
    (message) => {
      addToast({ type: MessageTypes.SUCCESS, message });
    },
    [addToast],
  );

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <AlertFactory alert={alert} onHide={removeToast} />
    </ToastContext.Provider>
  );
}

ToastProvider.propTypes = {
  children: PropTypes.node,
};

ToastProvider.defaultProps = {
  children: [],
};

export { ToastProvider, useToast };
