import React, { useContext, useState, createContext } from 'react';
import PropTypes from 'prop-types';
import { PaperProvider } from '@components/third-party-components';
import themes from './Themes';

const ThemeContext = createContext(themes.generic);

function useTheme() {
  return useContext(ThemeContext);
}

function ThemeProvider({ children }) {
  const [theme] = useState(themes.generic);
  return (
    <ThemeContext.Provider value={theme}>
      <PaperProvider theme={theme}>{children}</PaperProvider>
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
