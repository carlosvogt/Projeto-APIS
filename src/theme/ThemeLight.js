import merge from 'deepmerge';
import { DefaultTheme as PaperDefaultTheme } from 'react-native-paper';
import { DefaultTheme as NavigationDefaultTheme } from '@react-navigation/native';

const BaseTheme = merge(PaperDefaultTheme, NavigationDefaultTheme);

const Light = {
  primary: '#E66C00',
  secondary: '#FFF',
  background: '#FFF',
  reverseBackground: '#000000',
  text: '#E66C00',
  success: '#38A843',
  error: '#E54343',
  black: '#000000',
  line: '#F5F5F5',
  primaryLight: '#F5C499af',
  errorLight: '#E54343af',
};

const LightTheme = merge(BaseTheme, {
  colors: {
    ...Light,
  },
});

export default {
  light: LightTheme,
};
