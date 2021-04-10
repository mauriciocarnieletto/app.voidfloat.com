import { HomePage } from "./pages/HomePage";
import { AppRoute } from "../AppRoutes";

export const homeRoutes: AppRoute[] = [
  {
    title: "Home",
    name: "Home",
    component: HomePage,
    showOnMenu: false,
    path: "/",
    exact: true,
  },
];
