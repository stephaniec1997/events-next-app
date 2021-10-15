import { createTheme } from "@material-ui/core/styles";

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

export const coreTheme = createTheme({
  palette,
});

export const lightTheme = createTheme({
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

export const darkTheme = createTheme({
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
