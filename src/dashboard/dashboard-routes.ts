import { AppRoute } from "../AppRoutes";
import { DashboardPage } from "./pages/DashboardPage";

export const dashboardRoutes: AppRoute[] = [
  {
    title: "Pods",
    name: "Meus Pods",
    component: DashboardPage,
    showOnMenu: true,
    isPrivate: true,
    path: "/dashboard",
  },
];
