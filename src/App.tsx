import React from "react";
import { AppRoutes } from "./AppRoutes";
import { ThemeProvider } from "./layout/services/ThemeProvider";
import { AppContextProvider } from "./services/AppContext";
import { MessageHandlerProvider } from "./services/handlers/MessageHandler";

function App() {
  return (
    <ThemeProvider>
      <MessageHandlerProvider>
        <AppContextProvider>
          <AppRoutes />
        </AppContextProvider>
      </MessageHandlerProvider>
    </ThemeProvider>
  );
}

export default App;
