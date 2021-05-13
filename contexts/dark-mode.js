import { createContext } from 'react';

const DarkModeContext = createContext({
  isDarkMode: null,
  setDarkMode: () => {},
});

export default DarkModeContext;
