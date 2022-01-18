import { useContext, createContext } from 'react';
import themes from './Themes';

const ThemeContext = createContext(themes.generic);

function useTheme() {
  return useContext(ThemeContext);
}

export { useTheme };
