import React from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import { NavBackButton } from '@components';
import { TitleHeader } from '@components/typography';
import { useTheme } from '@theme';

function Header({ title, onGoBack, canGoBack }) {
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.primary,
    },
    view: {
      backgroundColor: colors.primary,
      height: 50,
      justifyContent: 'center',
    },
    iconContainer: { paddingRight: 16 },
  });

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <NavBackButton onGoBack={onGoBack} canGoBack={canGoBack} />
      </View>
      <View style={styles.view}>
        <TitleHeader>{title}</TitleHeader>
      </View>
    </View>
  );
}

Header.propTypes = {
  title: PropTypes.string,
  onGoBack: PropTypes.func,
  canGoBack: PropTypes.bool,
};

Header.defaultProps = {
  title: '',
  onGoBack: undefined,
  canGoBack: false,
};

export default Header;
