import { AppRoute } from "../AppRoutes";
import { ConfigurationPage } from "./pages/ConfigurationPage";
import { ParametersConfigurationPage } from "./pages/ParametersConfigurationPage";
import { ServerConfigurationPage } from "./pages/ServerConfigurationPage";

export const configurationRoutes: AppRoute[] = [
  {
    title: "Configurações",
    name: "Configurações",
    component: ConfigurationPage,
    showOnMenu: false,
    isPrivate: true,
    path: "/configuration",
    exact: true,
  },
  {
    title: "Configurações | Servidor & Rede",
    name: "Configurações | Servidor & Rede",
    component: ServerConfigurationPage,
    showOnMenu: false,
    isPrivate: true,
    path: "/configuration/server",
  },
  {
    title: "Configurações | Parâmetros",
    name: "Configurações | Parâmetros",
    component: ParametersConfigurationPage,
    showOnMenu: false,
    isPrivate: true,
    path: "/configuration/parameters",
  },
];
