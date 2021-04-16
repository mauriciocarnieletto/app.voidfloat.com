import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import * as io from "socket.io-client";
import { configuration } from "../../../services/api";
import GridItem from "../../../layout/components/Grid/GridItem";
import GridContainer from "../../../layout/components/Grid/GridContainer";
import { PodCard } from "../../components/PodCard/PodCard";
import { podApi } from "../../services/pod-api";

import { Pod } from "../../interfaces";

// import sound from "../../../assets/sounds/bell.mp3";
// import useStyles from "./dashboardStyle";

export interface PodsCardListProps {
  pods: Pod[];
  shouldEnableSocket?: boolean;
}

export function PodsPage({
  pods: podsParameter,
  shouldEnableSocket,
}: PodsCardListProps) {
  // const classes = useStyles();
  const [pods, setPods] = React.useState<Pod[]>(podsParameter);

  function receiveStatus(podsStatuses: any) {
    console.log(podsStatuses);
  }

  useEffect(() => {
    if (shouldEnableSocket) {
      const url = `${configuration.baseURL}/pod-gateway`;
      const socket = io
        .connect(url)
        .on("podStatus", ({ message }: { message: string }) => {
          receiveStatus(JSON.parse(message));
        })
        .on("connect", () => {
          console.log("Conectou");
        });
      socket
        .on("connect_failed", () => {
          console.log("Conexão falhou");
        })
        .on("disconnect", function () {
          console.log("Disconectou");
        })
        .emit("watchPods");
      return () => {
        socket.removeAllListeners();
      };
    }
  }, [shouldEnableSocket]);

  return (
    <div>
      <GridContainer>
        {pods.map((pod) => (
          <GridItem key={pod.id} xs={12} sm={6} md={4}>
            <PodCard pod={pod} />
          </GridItem>
        ))}
      </GridContainer>
    </div>
  );
}
