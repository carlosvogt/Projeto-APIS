import React, { useContext, createContext } from 'react';
import PropTypes from 'prop-types';
import { PaperProvider } from '@components/third-party-components';
import themeLight from './ThemeLight';
import themeDark from './ThemeDark';

const ThemeContext = createContext(themeLight.light);

function useTheme() {
  return useContext(ThemeContext);
}

function ThemeProvider({ children, theme }) {
  return (
    <ThemeContext.Provider value={theme ? themeDark.dark : themeLight.light}>
      <PaperProvider theme={theme ? themeDark.dark : themeLight.light}>
        {children}
      </PaperProvider>
    </ThemeContext.Provider>
  );
}

ThemeProvider.propTypes = {
  children: PropTypes.node,
};

ThemeProvider.defaultProps = {
  children: [],
};

export { ThemeProvider, useTheme };
