import React from "react";
import { Redirect } from "react-router-dom";
import { clientApi } from "../../../client/services/client-api";

export function HomePage() {
  const [isConfigured, setIsConfigured] = React.useState<boolean>();

  React.useEffect(() => {
    clientApi.get().then(({ data: client }) => {
      if (client) {
        setIsConfigured(true);
      } else {
        setIsConfigured(false);
      }
    });
  }, []);

  return typeof isConfigured === "undefined" ? (
    <>Loading</>
  ) : (
    <Redirect to={isConfigured ? "/dashboard" : "/setup/initial"} />
  );
}
