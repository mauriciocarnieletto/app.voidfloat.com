import React, { createContext, useContext, useState } from "react";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import { darkTheme, lightTheme } from "../../resources/themes";

export type Themes = "light" | "dark";

export interface ThemeContextProps {
  theme: Themes;
  setTheme?: React.Dispatch<React.SetStateAction<Themes>>;
}

const themeContextDefault: ThemeContextProps = {
  theme: "light",
};

export const ThemeContext = createContext<ThemeContextProps>(
  themeContextDefault
);

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
  const [theme, setTheme] = useState<ThemeContextProps["theme"]>(
    themeContextDefault.theme
  );

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <MaterialThemeProvider>{children}</MaterialThemeProvider>
    </ThemeContext.Provider>
  );
}
