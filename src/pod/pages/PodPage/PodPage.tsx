import React, { useEffect, useState } from "react";
import * as io from "socket.io-client";
import { useParams } from "react-router-dom";
import formatDistance from "date-fns/formatDistance";
import ptBR from "date-fns/locale/pt-BR";
import {
  Button,
  IconButton,
  Grid,
  CircularProgress,
  Portal,
  Modal as MuiModal,
  Paper,
  ButtonBase,
} from "@material-ui/core";

import { configuration } from "../../../services/api";
import { podApi } from "../../services/pod-api";
import { ActionsPicker } from "../../../pod-action/components/ActionsPicker";
import { podActions } from "../../services/pod-actions";

import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import WavesIcon from "@material-ui/icons/Waves";
import AutorenewIcon from "@material-ui/icons/Autorenew";
import LocalLaundryServiceIcon from "@material-ui/icons/LocalLaundryService";
import NightsStayIcon from "@material-ui/icons/NightsStay";
import RestoreIcon from "@material-ui/icons/Restore";
import TimerIcon from "@material-ui/icons/Timer";
import WifiOffIcon from "@material-ui/icons/WifiOff";
import AddCircleIcon from "@material-ui/icons/AddCircle";

import { CommonDashboard } from "./components/CommonDashboard";
import CardIcon from "../../../layout/components/Card/CardIcon";

import { MachineStates, Pod } from "../../interfaces";
import { PodForm } from "../../components/PodForm";
import useStyles from "./styles";

const Modal: React.FC<{ open: boolean }> = ({ open, children }) => {
  const classes = useStyles();
  return (
    <MuiModal open={open}>
      <div className={classes.modalBody}>
        <Paper>{children}</Paper>
      </div>
    </MuiModal>
  );
};

const InitializeSession: React.FC<{ pod: Pod }> = ({ pod }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Button
        color='secondary'
        variant='contained'
        onClick={() => setIsModalOpen(true)}>
        Iniciar a sessão
      </Button>
      <Portal>
        <Modal open={isModalOpen}>Iniciar sessão</Modal>
      </Portal>
    </>
  );
};

const CheckSetings = ({ pod }: { pod: Pod }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Button
        color='secondary'
        variant='contained'
        onClick={() => setIsModalOpen(true)}>
        Ver configurações
      </Button>
      <Portal>
        <Modal open={isModalOpen}>
          <PodForm pod={pod} onAfterSubmit={() => setIsModalOpen(false)} />
        </Modal>
      </Portal>
    </>
  );
};

export interface PodStatesProps {
  action: React.FC<{ pod: Pod }>;
  icon: React.FC<{ pod: Pod }>;
  title: React.FC<{ pod: Pod }>;
  dashboard: React.FC<{ pod: Pod }>;
  color: (pod: {
    pod: Pod;
  }) => "info" | "warning" | "danger" | "success" | "gray";
}

export const PodStates: {
  [key in MachineStates | "warning" | "loading"]: PodStatesProps;
} = {
  loading: {
    icon: ({ pod }) => <CircularProgress color='secondary' />,
    color: ({ pod }) => "gray",
    title: ({ pod }) => <>Atenção</>,
    action: ({ pod }) => <>Atenção</>,
    dashboard: ({ pod }) => <>Carregando dados</>,
  },

  warning: {
    icon: ({ pod }) => <WifiOffIcon />,
    color: ({ pod }) => "warning",
    title: ({ pod }) => <>Sem comunicação</>,
    action: ({ pod }) => <CheckSetings pod={pod} />,
    dashboard: ({ pod }) => <CircularProgress color='secondary' />,
  },

  [MachineStates.TURN_OFF]: {
    icon: ({ pod }) => <PowerSettingsNewIcon />,
    color: ({ pod }) => "gray",
    title: ({ pod }) => <>Desligado</>,
    action: ({ pod }) => (
      <Button
        color='primary'
        variant='contained'
        onClick={() => podActions.PRE_SESSAO()}>
        Acordar
      </Button>
    ),
    dashboard: ({ pod }) => <CommonDashboard pod={pod} />,
  },

  [MachineStates.PRE_SESSAO]: {
    icon: ({ pod }) => <AutorenewIcon />,
    color: ({ pod }) => "info",
    title: ({ pod }) => <>Pré Sessão</>,
    action: ({ pod }) => <InitializeSession pod={pod} />,
    dashboard: ({ pod }) => <CommonDashboard pod={pod} />,
  },

  [MachineStates.SESSAO]: {
    icon: ({ pod }) => <WavesIcon />,
    color: ({ pod }) => "info",
    title: ({ pod }) => <>Em sessão ({pod.screen?.remainingTime})</>,
    action: ({ pod }) => <></>,
    dashboard: ({ pod }) => <>Em sessão ({pod.screen?.remainingTime})</>,
  },

  [MachineStates.SESSAO_LIMPEZA]: {
    icon: ({ pod }) => <LocalLaundryServiceIcon />,
    color: ({ pod }) => "info",
    title: ({ pod }) => <>Limpeza</>,
    action: ({ pod }) => <></>,
    dashboard: ({ pod }) => <CommonDashboard pod={pod} />,
  },

  [MachineStates.SESSAO_NOTURNO]: {
    icon: ({ pod }) => <NightsStayIcon />,
    color: ({ pod }) => "info",
    title: ({ pod }) => <>Modo noturno</>,
    action: ({ pod }) => (
      <Button
        color='primary'
        variant='contained'
        onClick={() => podActions.PRE_SESSAO()}>
        Acordar
      </Button>
    ),
    dashboard: ({ pod }) => <CommonDashboard pod={pod} />,
  },

  [MachineStates.SESSAO_REPOUSO]: {
    icon: ({ pod }) => <RestoreIcon />,
    color: ({ pod }) => "info",
    title: ({ pod }) => <>Modo repouso</>,
    action: ({ pod }) => (
      <Button
        color='primary'
        variant='contained'
        onClick={() => podActions.PRE_SESSAO()}>
        Acordar
      </Button>
    ),
    dashboard: ({ pod }) => <CommonDashboard pod={pod} />,
  },

  [MachineStates.DELAY_SESSAO]: {
    icon: ({ pod }) => <TimerIcon />,
    color: ({ pod }) => "info",
    title: ({ pod }) => <>Delay Sessão</>,
    action: ({ pod }) => (
      <Button
        color='primary'
        variant='contained'
        onClick={() => podActions.SESSAO()}>
        Iniciar Sessão
      </Button>
    ),
    dashboard: ({ pod }) => <CommonDashboard pod={pod} />,
  },
};

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
          </h4>
        </ButtonBase>
        <ActionsPicker
          anchorEl={statusButtonRef?.current}
          isOpen={isActionsDrawerVisible}
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
  );
}
