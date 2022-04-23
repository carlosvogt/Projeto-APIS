import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import PropTypes from 'prop-types';
import { NavBackButton } from '@components';
import { TitleHeader } from '@components/typography';
import { useTheme } from '@theme';
import { Refresh } from '@assets';

function Header({
  title,
  onGoBack,
  canGoBack,
  showRefreshButton,
  isRefreshing,
  handleRefresh,
}) {
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.primary,
      justifyContent: 'space-between',
    },
    subContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    view: {
      backgroundColor: colors.primary,
      height: 50,
      justifyContent: 'center',
    },
    iconContainer: { paddingRight: 16 },
    refresh: {
      marginRight: 8,
    },
    refreshing: {
      marginRight: 12,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <View style={styles.iconContainer}>
          <NavBackButton onGoBack={onGoBack} canGoBack={canGoBack} />
        </View>
        <View style={styles.view}>
          <TitleHeader>{title}</TitleHeader>
        </View>
      </View>
      {showRefreshButton &&
        (isRefreshing ? (
          <ActivityIndicator
            style={styles.refreshing}
            size="large"
            color={colors.secondary}
          />
        ) : (
          <TouchableOpacity style={styles.refresh} onPress={handleRefresh}>
            <Refresh size={48} color={colors.secondary} />
          </TouchableOpacity>
        ))}
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
