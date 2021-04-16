import React, { useEffect } from "react";
import * as io from "socket.io-client";
import { configuration } from "../../../services/api";
import GridItem from "../../../layout/components/Grid/GridItem";
import GridContainer from "../../../layout/components/Grid/GridContainer";
import { PodCard } from "../../components/PodCard/PodCard";
import { podApi } from "../../services/pod-api";

import { Pod } from "../../interfaces";
import { Link } from "react-router-dom";

// import sound from "../../../assets/sounds/bell.mp3";
// import useStyles from "./dashboardStyle";

export function PodsPage() {
  const [pods, setPods] = React.useState<Pod[]>();
  const [isLoading, setIsLoading] = React.useState<boolean>();

  // function soundAlarm() {
  //   var audio = new Audio(sound);

  //   const interval = setInterval(() => {
  //     audio.play();
  //   }, 2000);
  // }

  function receiveStatus(podsStatuses: Pod[]) {
    setPods(podsStatuses);
  }

  useEffect(() => {
    setIsLoading(true);
    function fetchPods() {
      podApi
        .get()
        .then(({ data }) => {
          setPods(data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setIsLoading(false);
        });
    }

    fetchPods();
  }, []);

  useEffect(() => {
    const url = `${configuration.baseURL}/pod-gateway`;

    const socket = io
      .connect(url)
      .on("podStatus", ({ message }: { message: string }) => {
        receiveStatus(JSON.parse(message));
      })
      .on("connect", () => {
        console.log("coooooooooooooneeeeeeeeecteddddddddddddi");
      })
      .on("connect_failed", () => {
        console.log("culdi noit coooooooooooooneeeeeeeeecteddddddddddddi");
      })
      .on("disconnect", function () {
        console.log("Disconnected");
      });
    socket.emit("watchPods");

    return () => {
      socket.removeAllListeners();
    };
  }, [pods]);

  return isLoading ? (
    <>Loading</>
  ) : (
    <div>
      <GridContainer>
        {pods && pods.length > 0 ? (
          pods.map((pod) => (
            <GridItem key={pod.id} xs={12} sm={6} md={4}>
              <PodCard pod={pod} />
            </GridItem>
          ))
        ) : (
          <GridItem>
            <h3>Você ainda não possui uma void cadastrada.</h3>{" "}
            <p>
              <Link to='/pods/search'>Clique aqui para começar</Link>
            </p>
          </GridItem>
        )}
      </GridContainer>
    </div>
  );
}
