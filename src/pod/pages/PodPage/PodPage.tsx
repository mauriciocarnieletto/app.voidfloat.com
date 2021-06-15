import React, { useEffect } from "react";
import * as io from "socket.io-client";
import { useParams } from "react-router-dom";
import formatDistance from "date-fns/formatDistance";
import ptBR from "date-fns/locale/pt-BR";
import { IconButton, Grid, ButtonBase } from "@material-ui/core";

import { configuration } from "../../../services/api";
import { podApi } from "../../services/pod-api";
import { PodActionContextProvider } from "../../../pod-action/services/PodActionContext";
import { ActionsPicker } from "../../../pod-action/components/ActionsPicker";

import AddCircleIcon from "@material-ui/icons/AddCircle";
import MoreVertIcon from "@material-ui/icons/MoreVert";

import CardIcon from "../../../layout/components/Card/CardIcon";
import { PodStates } from "../../components/PodStates";

import { Pod } from "../../interfaces";
import useStyles from "./styles";

export function PodPage() {
  const [pod, setPod] = React.useState<Pod>();
  const [isActionsDrawerVisible, setIsActionsDrawerVisible] =
    React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>();
  const statusButtonRef = React.useRef<HTMLButtonElement>(null);
  const { podId } = useParams<{ podId: string }>();
  const classes = useStyles();

  const {
    icon: StatusIcon,
    color: getColor,
    action: StatusAction,
    title: StatusTitle,
    dashboard: StatusDashboard,
  } = PodStates[
    pod?.screen
      ? pod?.screen?.sessionStatus
      : !isLoading
      ? "warning"
      : "loading"
  ];

  function receiveStatus(receivedPod: Pod) {
    setPod(receivedPod);
  }

  useEffect(() => {
    if (!podId) {
      return;
    }

    function fetchPods() {
      podApi
        .getById(podId)
        .then(({ data }) => {
          receiveStatus(data);
        })
        .catch((error) => {
          console.error(error);
        });
    }

    fetchPods();
  }, [podId]);

  useEffect(() => {
    const url = `${configuration.baseURL}/pod-gateway`;
    setIsLoading(true);
    const socket = io
      .connect(url)
      .on("podStatus", ({ message }: { message: string }) => {
        const result = JSON.parse(message) as Pod[];
        const newPod = result.find((r) => r.id.toString() === podId);
        if (newPod) receiveStatus(newPod);
        setIsLoading(false);
      })
      .on("connect", () => {
        console.log("Connected");
      })
      .on("connect_failed", () => {
        console.log("Connection failed");
        setIsLoading(false);
      })
      .on("disconnect", function () {
        console.log("Disconnected");
        setIsLoading(false);
      });

    socket.emit("watchPods");

    return () => {
      socket.removeAllListeners();
    };
  }, [podId]);

  return isLoading || !pod ? (
    <>Loading</>
  ) : (
    <PodActionContextProvider pod={pod}>
      <Grid className={classes.root} container spacing={3}>
        <Grid className={classes.iconContainer} item xs={2} md={1}>
          <ButtonBase
            onClick={() => setIsActionsDrawerVisible(!isActionsDrawerVisible)}>
            <CardIcon className={classes.icon} color={getColor({ pod })}>
              <StatusIcon pod={pod} />
            </CardIcon>
          </ButtonBase>
        </Grid>
        <Grid item xs={10} md={8}>
          <h1>{pod.name}</h1>
          <ButtonBase
            ref={statusButtonRef}
            onClick={() => setIsActionsDrawerVisible(!isActionsDrawerVisible)}>
            <h4>
              <StatusTitle pod={pod} />
              <IconButton
                onClick={() =>
                  setIsActionsDrawerVisible(!isActionsDrawerVisible)
                }>
                <MoreVertIcon />
              </IconButton>
            </h4>
          </ButtonBase>
          <ActionsPicker
            anchorEl={statusButtonRef?.current}
            isOpen={isActionsDrawerVisible}
            pod={pod}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <StatusAction pod={pod} />
          <IconButton>
            <AddCircleIcon />
          </IconButton>
        </Grid>
        <StatusDashboard pod={pod} />
        <Grid item xs={12}>
          <Grid
            container
            direction='row'
            justify='space-between'
            alignItems='center'>
            <Grid item>
              <small>
                Última atualização{" "}
                <strong>
                  {pod.time &&
                    formatDistance(pod.time, new Date(), { locale: ptBR })}
                </strong>
              </small>
            </Grid>
            <Grid item>
              <small>
                <div>
                  <small>Ip: {pod.ipAddress}</small>
                </div>
                <div>
                  <small>Serial: {pod.serialNumber}</small>
                </div>
                <div>
                  <small>Firmware: {pod.screen?.fwVersion}</small>
                </div>
              </small>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </PodActionContextProvider>
  );
}
