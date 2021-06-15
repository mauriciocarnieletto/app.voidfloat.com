import { CircularProgress, Modal } from "@material-ui/core";
import React, { useContext, createContext, useState } from "react";

export const AppContext = createContext<{
  isLoading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  isLoading: false,
  setLoading: () => null,
});

export const AppContextProvider = ({
  children,
}: React.PropsWithChildren<{}>) => {
  const [isLoading, setLoading] = useState<boolean>(false);
  return (
    <AppContext.Provider value={{ isLoading, setLoading }}>
      <Modal open={isLoading}>
        <CircularProgress color='secondary' />
      </Modal>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
