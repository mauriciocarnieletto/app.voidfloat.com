import { authRoutes } from "./auth/auth-routes";
import { homeRoutes } from "./home/home-routes";
import { dashboardRoutes } from "./dashboard/dashboard-routes";
import { setupRoutes } from "./setup/setup-routes";
import { podRoutes } from "./pod/pod-routes";
import { calendarRoutes } from "./calendar/calendar-routes";
import { configurationRoutes } from "./configuration/configuration-routes";
import { errorsRoutes } from "./errors/errors-routes";

export const appRoutes = [
  ...setupRoutes,
  ...homeRoutes,
  ...authRoutes,
  ...dashboardRoutes,
  ...podRoutes,
  ...calendarRoutes,
  ...configurationRoutes,
  ...errorsRoutes,
];
