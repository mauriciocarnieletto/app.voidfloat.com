import React from "react";
import { AppRoutes } from "./AppRoutes";
import { ThemeProvider } from "./layout/services/ThemeProvider";
import { MessageHandlerProvider } from "./services/handlers/MessageHandler";

function App() {
  return (
    <ThemeProvider>
      <MessageHandlerProvider>
        <AppRoutes />
      </MessageHandlerProvider>
    </ThemeProvider>
  );
}

export default App;
