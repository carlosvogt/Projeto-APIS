import React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@theme';
import { TouchableOpacity, View } from 'react-native';
import { Button as PaperButton } from '../third-party-components';
import Title1 from '../typography/Title1';
import Title2 from '../typography/Title2';

function Button({
  icon,
  onPress,
  title,
  mode,
  style,
  block,
  titleFamily,
  disabled,
  loadingBlock,
  margin,
  textColor,
  viewStyle,
  ...props
}) {
  const { colors } = useTheme();

  const buttonStyle = {
    borderRadius: 20,
    backgroundColor: mode === 'outlined' ? colors.background : colors.primary,
    borderWidth: mode === 'outlined' ? 0 : 1,
    borderColor: mode === 'outlined' ? colors.primary : 'transparent',
    marginVertical: margin,
  };

  const buttonContentStyle = {
    height: mode === 'outlined' ? 'auto' : 50,
  };

  const touchableStyle = {
    alignSelf: 'center',
    marginVertical: 16,
  };

  if (disabled) {
    buttonStyle.opacity = 0.7;
  }

  return (
    <View style={viewStyle}>
      {mode === 'outlined' ? (
        <TouchableOpacity style={[touchableStyle, style]} onPress={onPress}>
          <Title2
            family={titleFamily}
            color={textColor || colors.reverseBackground}
            underlined
          >
            {title}
          </Title2>
        </TouchableOpacity>
      ) : (
        <PaperButton
          {...props}
          mode="contained"
          style={[buttonStyle, style]}
          contentStyle={buttonContentStyle}
          disabled={disabled || loadingBlock}
          onPress={onPress}
        >
          <Title1 family={titleFamily} color={textColor || colors.secondary}>
            {title}
          </Title1>
        </PaperButton>
      )}
    </View>
  );
}

Button.propTypes = {
  onPress: PropTypes.func,
  title: PropTypes.string,
  mode: PropTypes.oneOf(['outlined', 'icon', '']),
  style: PropTypes.object,
  viewStyle: PropTypes.object,
  block: PropTypes.bool,
  titleFamily: PropTypes.oneOf(['light', 'medium', 'regular', 'thin']),
  icon: PropTypes.string,
  textColor: PropTypes.string,
  disabled: PropTypes.bool,
  loadingBlock: PropTypes.bool,
  margin: PropTypes.number,
};

Button.defaultProps = {
  titleFamily: 'medium',
  onPress: () => {},
  title: '',
  mode: '',
  textColor: '',
  style: {},
  viewStyle: {},
  block: true,
  icon: '',
  disabled: false,
  loadingBlock: false,
  margin: 0,
};

export default Button;
