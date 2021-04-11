import { createContext } from "react";
import { User } from "../../../user/interfaces";
import { AuthTokenLocalStorageKey } from "../../constants";

export interface AuthContextProps {
  isAuth: boolean;
  user?: User;
  token: string | null;
}

export const AuthContext = createContext<AuthContextProps>({
  isAuth: true,
  token: localStorage.getItem(AuthTokenLocalStorageKey),
});
