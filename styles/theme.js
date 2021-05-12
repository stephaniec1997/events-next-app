import { createMuiTheme } from '@material-ui/core/styles';

const palette = {
  background:{
    default: '#ffffff'
  },
  primary: {
    main: '#5c52ab',
  },
  secondary: {
    main: '#22186e',
  },
};

export const coreTheme = createMuiTheme({
  palette,
});

export const lightTheme = createMuiTheme({
  ...coreTheme,
  palette:{
    ...coreTheme.palette,
    background:{
      default: '#ffffff'
    },
    type: 'light'
  }
})

export const darkTheme = createMuiTheme({
  ...coreTheme,
  palette:{
    ...coreTheme.palette,
    background:{
      default: '#1f1d1a'
    },
    type: 'dark'
  }
})
