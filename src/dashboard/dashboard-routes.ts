import { AppRoute } from "../AppRoutes";
import { DashboardPage } from "./pages/DashboardPage";

export const dashboardRoutes: AppRoute[] = [
  {
    title: "voidfloat",
    name: "voidfloat",
    component: DashboardPage,
    showOnMenu: false,
    isPrivate: true,
    path: "/dashboard",
  },
];
