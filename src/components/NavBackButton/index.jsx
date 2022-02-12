import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@theme';
import { ArrowBack } from '@assets';

const styles = StyleSheet.create({
  backButtonContainer: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

function NavBackButton({ onGoBack, canGoBack }) {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const containerStyles = [styles.backButtonContainer];

  function handleGoBack() {
    if (onGoBack) {
      onGoBack();
      return;
    }
    navigation.goBack();
  }

  if (!navigation.canGoBack() && canGoBack === false) {
    return null;
  }

  return (
    <TouchableOpacity
      testID="nav-back-button"
      style={containerStyles}
      onPress={handleGoBack}
    >
      <ArrowBack color={colors.secondary} />
    </TouchableOpacity>
  );
}

NavBackButton.propTypes = {
  onGoBack: PropTypes.func,
  canGoBack: PropTypes.bool,
};

NavBackButton.defaultProps = {
  onGoBack: undefined,
  canGoBack: false,
};

export default NavBackButton;
