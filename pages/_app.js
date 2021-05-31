import { useState } from "react";
import nookies from "nookies";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";

import Navbar from "components/navbar";

import DarkModeContext from "contexts/dark-mode";
import { AuthenticationProvider } from "contexts/authentication";

import { darkTheme, lightTheme } from "styles/theme";

function App({ Component, pageProps, previousTheme }) {
  const [isDarkMode, setDarkMode] = useState(previousTheme === "dark");

  const theme = isDarkMode ? darkTheme : lightTheme;

  const toggleTheme = (theme) => {
    const themeText = theme ? "dark" : "light";
    nookies.set(undefined, "theme", themeText, { path: "/" });
    setDarkMode(theme);
  };

  return (
    <AuthenticationProvider>
      <DarkModeContext.Provider value={{ isDarkMode, toggleTheme }}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Navbar />
          <Component {...pageProps} />
        </ThemeProvider>
      </DarkModeContext.Provider>
    </AuthenticationProvider>
  );
}

App.getInitialProps = async ({ Component, ctx }) => {
  let pageProps = {};
  let previousTheme = "light";
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  const cookies = await nookies.get(ctx);
  previousTheme = cookies.theme || previousTheme;

  return {
    pageProps,
    previousTheme,
  };
};

export default App;

// TODO: see how you can minimize initial load js
