import { createMuiTheme } from "@material-ui/core/styles";

export const lightTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#152133",
    },
    secondary: {
      main: "#BFA266",
    },
  },
});

export const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#152133",
    },
    secondary: {
      main: "#BFA266",
    },
  },
});
