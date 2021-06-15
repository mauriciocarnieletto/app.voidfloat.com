import React, { useState } from "react";
import { Button, CircularProgress } from "@material-ui/core";

import { Modal } from "../../../layout/components/Modal";

import { podActions } from "../../services/pod-actions";

import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import WavesIcon from "@material-ui/icons/Waves";
import AutorenewIcon from "@material-ui/icons/Autorenew";
import LocalLaundryServiceIcon from "@material-ui/icons/LocalLaundryService";
import NightsStayIcon from "@material-ui/icons/NightsStay";
import RestoreIcon from "@material-ui/icons/Restore";
import TimerIcon from "@material-ui/icons/Timer";
import WifiOffIcon from "@material-ui/icons/WifiOff";

import { CommonDashboard } from "./components/CommonDashboard";

import { MachineStates, Pod } from "../../interfaces";
import { PodForm } from "../PodForm";

export interface PodStatesProps {
  action: React.FC<{ pod: Pod }>;
  icon: React.FC<{ pod: Pod }>;
  title: React.FC<{ pod: Pod }>;
  dashboard: React.FC<{ pod: Pod }>;
  color: (pod: {
    pod: Pod;
  }) => "info" | "warning" | "danger" | "success" | "gray";
}

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
      <Modal open={isModalOpen}>
        <>Iniciar sessão</>
      </Modal>
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
      <Modal open={isModalOpen}>
        <PodForm pod={pod} onAfterSubmit={() => setIsModalOpen(false)} />
      </Modal>
    </>
  );
};

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
        onClick={() => podActions.PRE_SESSAO(pod)}>
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
        onClick={() => podActions.PRE_SESSAO(pod)}>
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
        onClick={() => podActions.PRE_SESSAO(pod)}>
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
        onClick={() => podActions.SESSAO(pod)}>
        Iniciar Sessão
      </Button>
    ),
    dashboard: ({ pod }) => <CommonDashboard pod={pod} />,
  },
};
