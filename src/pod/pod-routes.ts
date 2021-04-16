import { AppRoute } from "../AppRoutes";
import { PodsPage } from "./pages/PodsPage";
import { PodFormPage } from "./pages/PodFormPage";
import { SearchPodsPage } from "./pages/SearchPodsPage";

import BathtubIcon from "@material-ui/icons/Bathtub";

export const podRoutes: AppRoute[] = [
  {
    title: "Pods",
    name: "Meus Pods",
    component: PodsPage,
    showOnMenu: true,
    isPrivate: true,
    path: "/pods",
    icon: BathtubIcon,
    exact: true,
  },
  {
    title: "",
    name: "Encontrar Pods",
    component: SearchPodsPage,
    showOnMenu: false,
    isPrivate: true,
    path: "/pods/search",
    icon: BathtubIcon,
    exact: true,
  },
  {
    title: "Pod",
    name: "Pod",
    component: PodFormPage,
    showOnMenu: false,
    isPrivate: true,
    path: "/pods/pod",
    icon: BathtubIcon,
  },
];
