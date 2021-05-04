import React, { useEffect } from "react";
import * as io from "socket.io-client";
import { Link, useParams } from "react-router-dom";
import { configuration } from "../../../services/api";
import GridItem from "../../../layout/components/Grid/GridItem";
import GridContainer from "../../../layout/components/Grid/GridContainer";
import { PodCard } from "../../components/PodCard/PodCard";
import { podApi } from "../../services/pod-api";

import { Pod } from "../../interfaces";

export function PodPage() {
  const [pod, setPod] = React.useState<Pod>();
  const [isLoading, setIsLoading] = React.useState<boolean>();
  const { podId } = useParams<{ podId: string }>();

  function receiveStatus(receivedPod: Pod) {
    setPod(receivedPod);
  }

  useEffect(() => {
    if (!podId) {
      return;
    }
    setIsLoading(true);
    function fetchPods() {
      podApi
        .getById(podId)
        .then(({ data }) => {
          receiveStatus(data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setIsLoading(false);
        });
    }

    fetchPods();
  }, [podId]);

  useEffect(() => {
    const url = `${configuration.baseURL}/pod-gateway`;

    const socket = io
      .connect(url)
      .on("podStatus", ({ message }: { message: string }) => {
        receiveStatus(JSON.parse(message));
      })
      .on("connect", () => {
        console.log("Connected");
      })
      .on("connect_failed", () => {
        console.log("Connection failed");
      })
      .on("disconnect", function () {
        console.log("Disconnected");
      });

    socket.emit("watchPods");

    return () => {
      socket.removeAllListeners();
    };
  }, []);

  return isLoading || !pod ? (
    <>Loading</>
  ) : (
    <div>
      <GridContainer>
        <GridItem key={pod.id} xs={12} sm={6} md={4}>
          <Link to={`/pods/pod/${pod.id}`}>
            <PodCard pod={pod} />
          </Link>
        </GridItem>
      </GridContainer>
    </div>
  );
}
