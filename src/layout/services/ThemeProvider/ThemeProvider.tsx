import React, { createContext, useContext, useReducer, useState } from "react";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import { darkTheme, lightTheme } from "../../themes";

export type Themes = "light" | "dark";

export interface ThemeContextProps {
  theme: Themes;
  setTheme?: React.Dispatch<React.SetStateAction<Themes>>;
}

export const ThemeContext = createContext<ThemeContextProps>({
  theme: "dark",
});

export function useTheme() {
  const themeContext = useContext(ThemeContext);

  return themeContext;
}

function MaterialThemeProvider({ children }: React.PropsWithChildren<unknown>) {
  const { theme } = useTheme();

  return (
    <MuiThemeProvider theme={theme === "dark" ? darkTheme : lightTheme}>
      {children}
    </MuiThemeProvider>
  );
}

export function ThemeProvider({ children }: React.PropsWithChildren<unknown>) {
  const [theme, setTheme] = useState<ThemeContextProps["theme"]>("dark");

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <MaterialThemeProvider>{children}</MaterialThemeProvider>
    </ThemeContext.Provider>
  );
}
