import InitialSetupPage from "./pages/InitialSetupPage";
import { AppRoute } from "../AppRoutes";

export const setupRoutes: AppRoute[] = [
  {
    title: "Configuração Inicial",
    name: "Configuração inicial",
    component: InitialSetupPage,
    showOnMenu: false,
    isPrivate: false,
    path: "/setup/initial",
  },
];
