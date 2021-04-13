import { useContext, createContext, useEffect, useState } from "react";
import { User } from "../../../user/interfaces";
import { AuthTokenLocalStorageKey } from "../../constants";
import { userApi } from "../../../user/services/user-api";

export interface AuthContextProps {
  isAuth: boolean;
  user?: User;
  token: string | null;
  setToken?: React.Dispatch<React.SetStateAction<string | null>>;
}

export const AuthContext = createContext<AuthContextProps>({
  isAuth: true,
  token: localStorage.getItem(AuthTokenLocalStorageKey),
  setToken: undefined,
});

export function AuthProvider({ children }: React.PropsWithChildren<{}>) {
  const [token, setToken] = useState(
    localStorage.getItem(AuthTokenLocalStorageKey)
  );
  const [user, setUser] = useState<User>();

  useEffect(() => {
    if (token) {
      userApi.me().then((response) => {
        setUser(response.data);
      });
    }
  }, [token]);

  return (
    <AuthContext.Provider
      value={{ token, user, setToken, isAuth: Boolean(token) }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
