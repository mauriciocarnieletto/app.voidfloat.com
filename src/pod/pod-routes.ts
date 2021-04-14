import { AppRoute } from "../AppRoutes";
import { PodsPage } from "./pages/PodsPage";
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
  },
];
