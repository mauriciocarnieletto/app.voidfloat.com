import md5 from "crypto-js/md5";
import { api } from "../../services/api";
import { User } from "../../user/interfaces";
import { AuthTokenLocalStorageKey } from "../constants";

export const authApi = {
  preparePassword(password: string) {
    return md5(password).toString();
  },
  async receiveToken(authToken: string) {
    localStorage.setItem(AuthTokenLocalStorageKey, authToken);
    return authToken;
  },
  async signIn(email: string, password: string) {
    const response = await api.post<{ access_token: string }>("/auth/login", {
      email,
      password: await this.preparePassword(password),
    });

    return this.receiveToken(response.data.access_token);
  },
  async signUp(user: User) {
    const { password = "", ...userData } = user;
    const response = await api.post("/auth/signup", {
      ...userData,
      password: await this.preparePassword(password),
    });

    return this.receiveToken(response.data.access_token);
  },
};
