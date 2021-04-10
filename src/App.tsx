import React from "react";
import { AppRoutes } from "./AppRoutes";
import { ThemeProvider } from "./layout/services/ThemeProvider";

function App() {
  return (
    <ThemeProvider>
      <AppRoutes />
    </ThemeProvider>
  );
}

export default App;
