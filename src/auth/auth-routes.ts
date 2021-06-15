import { AppRoute } from "../AppRoutes";
import { LoginPage } from "./pages/LoginPage";
import { LogoutPage } from "./pages/LogoutPage";

export const authRoutes: AppRoute[] = [
  {
    title: "Login",
    name: "Login",
    component: LoginPage,
    showOnMenu: false,
    isPrivate: false,
    path: "/login",
  },
  {
    title: "Logout",
    name: "Logout",
    component: LogoutPage,
    showOnMenu: false,
    isPrivate: false,
    path: "/Logout",
  },
];
