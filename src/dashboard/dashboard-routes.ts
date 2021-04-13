import { AppRoute } from "../AppRoutes";
import { DashboardPage } from "./pages/DashboardPage";

export const dashboardRoutes: AppRoute[] = [
  {
    title: "Home",
    name: "Dashboard",
    component: DashboardPage,
    showOnMenu: true,
    isPrivate: true,
    path: "/dashboard",
  },
];
