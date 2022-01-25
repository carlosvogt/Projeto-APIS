import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { Animated, StyleSheet, Platform } from 'react-native';
import Alert from '../../Alert';

export const MessageTypes = {
  ERROR: 'Error',
  SUCCESS: 'Success',
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    ...Platform.select({
      ios: {
        top: 35,
      },
      android: {
        top: 35,
      },
      default: {
        top: 0,
      },
    }),
    left: 0,
    right: 0,
    marginHorizontal: 16,
  },
});

function AlertFactory({ alert, onHide }) {
  const containerY = useRef(new Animated.Value(-100)).current;

  function slideInTop() {
    Animated.timing(containerY, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (finished) {
        containerY.setValue(0);
      }
    });
  }

  function slideOutTop(callback) {
    Animated.timing(containerY, {
      toValue: -100,
      duration: 300,
      useNativeDriver: true,
    }).start(callback);
  }

  function handleHide(event) {
    slideOutTop(({ finished }) => {
      if (finished) {
        containerY.setValue(-100);
        onHide(event);
      }
    });
  }

  function renderAlert() {
    const AlertComponent = Alert[alert.type];

    if (!AlertComponent) {
      throw new Error(`unsupported alert type: "${alert.type}"`);
    }

    slideInTop();

    return <AlertComponent message={alert.message} onHide={handleHide} />;
  }

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ translateY: containerY }],
        },
      ]}
    >
      {alert && renderAlert()}
    </Animated.View>
  );
}

AlertFactory.propTypes = {
  alert: PropTypes.shape({
    type: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
  }),
  onHide: PropTypes.func,
};

AlertFactory.defaultProps = {
  alert: null,
  onHide: () => {},
};

export default AlertFactory;
