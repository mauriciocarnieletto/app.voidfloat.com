import { authRoutes } from "./auth/auth-routes";
import { homeRoutes } from "./home/home-routes";
import { dashboardRoutes } from "./dashboard/dashboard-routes";
import { setupRoutes } from "./setup/setup-routes";

export const appRoutes = [
  ...setupRoutes,
  ...homeRoutes,
  ...authRoutes,
  ...dashboardRoutes,
];
