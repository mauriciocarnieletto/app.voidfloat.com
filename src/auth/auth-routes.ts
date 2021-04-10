import { AppRoute } from "../AppRoutes";
import { LoginPage } from "./pages/LoginPage";

export const authRoutes: AppRoute[] = [
  {
    title: "Login",
    name: "Login",
    component: LoginPage,
    showOnMenu: false,
    isPrivate: false,
    path: "/login",
  },
];
