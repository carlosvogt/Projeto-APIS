import merge from 'deepmerge';
import { DefaultTheme as PaperDefaultTheme } from 'react-native-paper';
import { DefaultTheme as NavigationDefaultTheme } from '@react-navigation/native';

const BaseTheme = merge(PaperDefaultTheme, NavigationDefaultTheme);

const Dark = {
  primary: '#E66C00',
  secondary: '#FFF',
  background: '#000000',
  reverseBackground: '#FFF',
  text: '#FFF',
  success: '#38A843',
  error: '#E54343',
  black: '#000000',
  line: '#F5F5F5',
  primaryLight: '#F5C499af',
  errorLight: '#E54343af',
};

const DarkTheme = merge(BaseTheme, {
  colors: {
    ...Dark,
  },
});

export default {
  dark: DarkTheme,
};
