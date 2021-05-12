import React from 'react';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';


const ThemeSwitch = ({isDarkMode, setDarkMode}) => {
  return (
    <FormControlLabel
      control={
        <Switch
          checked={isDarkMode}
          onChange={() => setDarkMode(!isDarkMode)}
          name="isDarkMode"
          color="primary"
        />
      }
      label="Dark Mode"
    />
  );
}

export default ThemeSwitch;
