import { AppRoute } from "../AppRoutes";
import { NotFoundPage } from "./pages/NotFoundPage";

export const errorsRoutes: AppRoute[] = [
  {
    title: "404",
    name: "404",
    component: NotFoundPage,
    showOnMenu: false,
    isPrivate: false,
  },
];
