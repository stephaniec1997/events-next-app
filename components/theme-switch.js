import { useContext } from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

import DarkModeContext from "contexts/dark-mode";

const ThemeSwitch = () => {
  const { isDarkMode, setDarkMode } = useContext(DarkModeContext);

  return (
    <FormControlLabel
      control={
        <Switch
          checked={isDarkMode}
          onChange={() => setDarkMode(!isDarkMode)}
          name="isDarkMode"
          color="secondary"
        />
      }
      label="Dark Mode"
    />
  );
}

export default ThemeSwitch;
