import React from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import { useTheme } from '@theme';

function Footer({ children, withBorder, ...props }) {
  const { colors } = useTheme();
  const { style, ...rest } = props;

  const localStyles = StyleSheet.create({
    footer: {
      paddingTop: 16,
      borderTopWidth: 1,
      borderTopColor: 'transparent',
      marginTop: 'auto',
    },
  });

  const localStyle = [localStyles.footer];

  if (withBorder) {
    localStyle.push({
      borderTopColor: colors.line,
    });
  }

  return (
    <View
      style={[localStyle, { backgroundColor: colors.background }, style]}
      {...rest}
    >
      {children}
    </View>
  );
}

Footer.propTypes = {
  children: PropTypes.node.isRequired,
  withBorder: PropTypes.bool,
  style: PropTypes.object,
};

Footer.defaultProps = {
  withBorder: true,
  style: {},
};

export default Footer;
