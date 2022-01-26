import merge from 'deepmerge';
import { DefaultTheme as PaperDefaultTheme } from 'react-native-paper';
import { DefaultTheme as NavigationDefaultTheme } from '@react-navigation/native';

const BaseTheme = merge(PaperDefaultTheme, NavigationDefaultTheme);
const darkMode = false;

const GenericThemeColors = {
  primary: '#E66C00',
  secondary: '#FFF',
  background: darkMode ? '#000000' : '#FFF',
  reverseBackground: darkMode ? '#FFF' : '#000000',
  text: darkMode ? '#FFF' : '#E66C00',
  success: '#38A843',
  error: '#E54343',
  black: '#000000',
  line: '#F5F5F5',
};

const GenericTheme = merge(BaseTheme, {
  colors: {
    ...GenericThemeColors,
  },
});

export default {
  generic: GenericTheme,
};
