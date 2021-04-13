import { createMuiTheme } from "@material-ui/core/styles";

const theme = {
  palette: {
    primary: {
      main: "#152133",
    },
    secondary: {
      main: "#BFA266",
    },
  },
  typography: {
    fontFamily: ["Poppins", "Roboto"].join(","),
  },
};

export const lightTheme = createMuiTheme({ ...theme });

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
  typography: {
    fontFamily: ["Poppins", "Roboto"].join(","),
  },
});
