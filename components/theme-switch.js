import { useContext } from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

import DarkModeContext from "contexts/dark-mode";

const ThemeSwitch = () => {
  const { isDarkMode, toggleTheme } = useContext(DarkModeContext);

  return (
    <FormControlLabel
      control={
        <Switch
          checked={isDarkMode}
          onChange={() => toggleTheme(!isDarkMode)}
          name="isDarkMode"
          color="secondary"
        />
      }
      label="Dark Mode"
    />
  );
};

export default ThemeSwitch;
