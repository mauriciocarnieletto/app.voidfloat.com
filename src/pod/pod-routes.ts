import { AppRoute } from "../AppRoutes";
import { PodsPage } from "./pages/PodsPage";
import { PodPage } from "./pages/PodPage";
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
    strict: true,
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
    title: "Criar um pod",
    name: "Criar um pod",
    component: PodFormPage,
    showOnMenu: false,
    isPrivate: true,
    path: "/pods/create",
    icon: BathtubIcon,
    exact: true,
  },
  {
    title: "Pod",
    name: "Pod",
    component: PodPage,
    showOnMenu: false,
    isPrivate: true,
    path: "/pods/pod/:podId",
    icon: BathtubIcon,
  },
];
