import { createMuiTheme } from "@material-ui/core/styles";

const palette = {
  background: {
    default: "#ffffff",
  },
  primary: {
    main: "#FF521B",
    contrastText: "#1f1d1a ",
  },
  secondary: {
    main: "#FC9E4F",
  },
};

export const coreTheme = createMuiTheme({
  palette,
});

export const lightTheme = createMuiTheme({
  ...coreTheme,
  palette: {
    ...coreTheme.palette,
    background: {
      default: "#ffffff",
    },
    text: {
      primary: "#1f1d1a",
    },
    type: "light",
  },
});

export const darkTheme = createMuiTheme({
  ...coreTheme,
  palette: {
    ...coreTheme.palette,
    background: {
      default: "#1f1d1a",
    },
    text: {
      primary: "#FF521B",
    },
    type: "dark",
  },
});
