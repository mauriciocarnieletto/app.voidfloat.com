import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  RouteProps,
  Redirect,
} from "react-router-dom";
import { Helmet } from "react-helmet";

import { AuthProvider } from "./auth/services/AuthContext";

import { PrivateLayout } from "./layout/components/PrivateLayout";
import { PublicLayout } from "./layout/components/PublicLayout";
import { useAuth } from "./auth/services/useAuth";

import { appRoutes } from "./app-routes";

export type AppRoute = RouteProps & {
  title: string;
  name: string;
  path: string;
  isPrivate?: boolean;
  showOnMenu?: boolean;
};

export function PrivateRoute({
  title,
  name,
  showOnMenu,
  component,
  isPrivate,
  ...routeProps
}: AppRoute) {
  const Component = component as any;

  const { isAuth } = useAuth();

  return (
    <Route
      {...routeProps}
      render={(props) =>
        isAuth ? (
          <PrivateLayout>
            <Helmet>
              <title>{title}</title>
            </Helmet>
            <Component {...props} />
          </PrivateLayout>
        ) : (
          <Redirect to={`/login?from=${props.location.pathname}`} />
        )
      }
    />
  );
}

export function PublicRoute({
  title,
  name,
  showOnMenu,
  component,
  isPrivate,
  ...routeProps
}: AppRoute) {
  const Component = component as any;

  return (
    <Route
      {...routeProps}
      render={(props) => (
        <PublicLayout>
          <Helmet>
            <title>{title}</title>
          </Helmet>
          <Component {...props} />
        </PublicLayout>
      )}
    />
  );
}

export function AppRoutes() {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          {appRoutes.map((props) => {
            return props.isPrivate ? (
              <PrivateRoute key={props.path} {...props} />
            ) : (
              <PublicRoute key={props.path} {...props} />
            );
          })}
        </Switch>
      </Router>
    </AuthProvider>
  );
}
