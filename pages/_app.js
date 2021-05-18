import { useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';

import DarkModeContext from 'contexts/dark-mode';

import Navbar from 'components/navbar';
import { darkTheme, lightTheme } from 'styles/theme';

function MyApp({ Component, pageProps }) {
  const [isDarkMode, setDarkMode] = useState(true);

  const theme = isDarkMode ? darkTheme : lightTheme;

  return(
    <DarkModeContext.Provider value={{ isDarkMode, setDarkMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Navbar />
        <Component {...pageProps} />
      </ThemeProvider>
    </DarkModeContext.Provider>
  );
}

export default MyApp;
