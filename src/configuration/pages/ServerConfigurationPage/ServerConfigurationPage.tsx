import React, { useEffect } from "react";
import { Container } from "@material-ui/core";
import {
  MessageHandlerActions,
  useMessageHandler,
} from "../../../services/handlers/MessageHandler";
import { NetworkConfigurationForm } from "../../components/NetworkConfigurationForm";
import { NetworkConfiguration } from "../../interfaces";
import { networkConfigurationApi } from "../../services/server-configuration-api";

export function ServerConfigurationPage() {
  const [networkData, setNetworkData] = React.useState<NetworkConfiguration>();
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  const { dispatch } = useMessageHandler();

  useEffect(() => {
    setIsLoading(true);
    networkConfigurationApi
      .get()
      .then((response) => {
        setNetworkData(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        dispatch({
          type: MessageHandlerActions.ERROR,
          payload: {
            type: MessageHandlerActions.ERROR,
            message: "Ocorreu um erro ao atualizar a interface de rede",
            description: error.message,
          },
        });
      });
  }, [dispatch]);

  return isLoading ? (
    <Container>
      <NetworkConfigurationForm networkConfiguration={networkData} />
    </Container>
  ) : (
    <>Loading</>
  );
}
