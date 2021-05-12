import { useState } from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import ThemeSwitch from '../components/theme-switch'

import {darkTheme, lightTheme} from '../styles/theme'

function MyApp({ Component, pageProps }) {

  const [isDarkMode, setDarkMode] = useState(true);

  const theme = isDarkMode ? darkTheme : lightTheme;

  return(
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ThemeSwitch isDarkMode={isDarkMode} setDarkMode={setDarkMode} />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp
