import { AppRoute } from "../AppRoutes";
import { CalendarPage } from "./pages/CalendarPage";
import TodayIcon from "@material-ui/icons/Today";

export const calendarRoutes: AppRoute[] = [
  {
    title: "Calendário",
    name: "Agenda",
    component: CalendarPage,
    showOnMenu: true,
    icon: TodayIcon,
    isPrivate: true,
    path: "/calendar",
  },
];
