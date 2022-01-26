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
      borderBottomRightRadius: 25,
    },
  });

  return (
    <View style={styles.container}>
      <View style={{ paddingRight: 16 }}>
        <NavBackButton onGoBack={onGoBack} canGoBack={canGoBack} />
      </View>
      <View
        style={{
          backgroundColor: colors.primary,
          height: 50,
          justifyContent: 'center',
        }}
      >
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
