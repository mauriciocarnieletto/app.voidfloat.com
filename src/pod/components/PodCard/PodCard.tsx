import React, { useRef, useState } from "react";
import clsx from "classnames";
import IconButton from "@material-ui/core/IconButton";

import Card from "../../../layout/components/Card/Card";
import CardHeader from "../../../layout/components/Card/CardHeader";
import CardIcon from "../../../layout/components/Card/CardIcon";
import CardBody from "../../../layout/components/Card/CardBody";
import CardFooter from "../../../layout/components/Card/CardFooter";
import { PodActionsMenu, PodActionsMenuProps } from "../PodActionsPopper";

import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import WavesIcon from "@material-ui/icons/Waves";
import AutorenewIcon from "@material-ui/icons/Autorenew";
import LocalLaundryServiceIcon from "@material-ui/icons/LocalLaundryService";
import NightsStayIcon from "@material-ui/icons/NightsStay";
import RestoreIcon from "@material-ui/icons/Restore";
import TimerIcon from "@material-ui/icons/Timer";
import ControlPointIcon from "@material-ui/icons/ControlPoint";

import useStyles from "./styles";
import { MachineStates, Pod } from "../../interfaces";

export interface PodCardProps {
  pod: Pod;
}

export interface PodStatesProps {
  action: React.FC<PodCardProps>;
  icon: React.FC<PodCardProps>;
  color: (
    pod: PodCardProps["pod"]
  ) => "info" | "warning" | "danger" | "success" | "gray";
}

export const PodStates: { [key in MachineStates]: PodStatesProps } = {
  [MachineStates.TURN_OFF]: {
    icon: (props: PodCardProps) => <PowerSettingsNewIcon />,
    color: (pod: Pod) => "gray",
    action: (props: PodCardProps) => <>Desligado</>,
  },

  [MachineStates.PRE_SESSAO]: {
    icon: (props: PodCardProps) => <AutorenewIcon />,
    color: (pod: Pod) => "info",
    action: (props: PodCardProps) => <>Pré Sessão</>,
  },

  [MachineStates.SESSAO]: {
    icon: (props: PodCardProps) => <WavesIcon />,
    color: (pod: Pod) => "info",
    action: ({ pod }: PodCardProps) => (
      <>Em sessão ({pod.screen.remainingTime})</>
    ),
  },

  [MachineStates.SESSAO_LIMPEZA]: {
    icon: (props: PodCardProps) => <LocalLaundryServiceIcon />,
    color: (pod: Pod) => "info",
    action: (props: PodCardProps) => <>Limpeza</>,
  },

  [MachineStates.SESSAO_NOTURNO]: {
    icon: (props: PodCardProps) => <NightsStayIcon />,
    color: (pod: Pod) => "info",
    action: (props: PodCardProps) => <>Modo noturno</>,
  },

  [MachineStates.SESSAO_REPOUSO]: {
    icon: (props: PodCardProps) => <RestoreIcon />,
    color: (pod: Pod) => "info",
    action: (props: PodCardProps) => <>Modo repouso</>,
  },

  [MachineStates.DELAY_SESSAO]: {
    icon: (props: PodCardProps) => <TimerIcon />,
    color: (pod: Pod) => "info",
    action: (props: PodCardProps) => <>Delay Sessão</>,
  },
};

function PodCardComponent({ pod }: PodCardProps) {
  const classes = useStyles();
  const actionsMenuButtonRef = useRef<HTMLButtonElement>(null);
  const { icon: StatusIcon, color: getColor, action: StatusAction } = PodStates[
    pod.screen.sessionStatus
  ];
  const [isActionsMenuOpen, setIsActionsMenuOpen] = useState(false);

  return (
    <Card>
      <CardHeader color={getColor(pod)} stats icon>
        <CardIcon color={getColor(pod)}>
          <StatusIcon pod={pod} />
        </CardIcon>
        <p className={classes.cardCategory}>{pod.model}</p>
        <h3 className={classes.cardTitle}>{pod.name}</h3>
      </CardHeader>
      <CardBody>
        {pod.connection.isConnected ? "Conectado" : "Sem comunicação"}
      </CardBody>
      <CardFooter stats>
        <div className={classes.stats}>
          <StatusAction pod={pod} />
        </div>
        <div className={clsx(classes.footerActions, classes.stats)}>
          <IconButton
            ref={actionsMenuButtonRef}
            onClick={() => setIsActionsMenuOpen((state) => !state)}>
            <ControlPointIcon />
          </IconButton>
          <PodActionsMenu
            anchorEl={
              (actionsMenuButtonRef as unknown) as PodActionsMenuProps["anchorEl"]
            }
            isOpen={isActionsMenuOpen}
            setIsOpen={setIsActionsMenuOpen}
            pod={pod}
          />
        </div>
      </CardFooter>
    </Card>
  );
}

PodCardComponent.displayName = "PodCard";

export const PodCard = React.memo(PodCardComponent);
