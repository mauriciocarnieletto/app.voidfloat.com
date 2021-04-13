import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";

import { ClientForm } from "../../client/components/ClientForm";
import { Client } from "../../client/interfaces";
import { clientApi } from "../../client/services/client-api";

import { SignUpForm } from "../../auth/components/SignUpForm";
import { User } from "../../user/interfaces";

import { NetworkConfigurationForm } from "../../configuration/components/NetworkConfigurationForm";
import { NetworkConfiguration } from "../../configuration/interfaces";
import { networkConfigurationApi } from "../../configuration/services/server-configuration-api";

import { slugify } from "../../helpers";
import {
  MessageHandlerActions,
  useMessageHandler,
} from "../../services/handlers/MessageHandler";
import { useAuth } from "../../auth/services/useAuth";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(6),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    marginTop: theme.spacing(6),
    marginRight: theme.spacing(1),
  },
  stepButton: {
    cursor: "pointer",
  },
  stepContainer: {
    width: "100%",
    marginTop: theme.spacing(6),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return [
    "Cadastrar Cliente",
    "Criar Usuário",
    "Configurar Servidor",
    "Encontrar Pod's",
  ];
}

interface StepState {
  isLoading: boolean;
  activeStep: number;
  clientData?: Client;
  userData?: User;
  networkConfigurationData?: NetworkConfiguration;
}

export default function InitialSetupPage() {
  const classes = useStyles();
  const { dispatch } = useMessageHandler();
  const [state, setState] = React.useState<StepState>({
    isLoading: false,
    activeStep: 0,
    clientData: undefined,
    userData: undefined,
    networkConfigurationData: undefined,
  });

  const {
    isLoading,
    activeStep,
    clientData,
    userData,
    networkConfigurationData,
  } = state;

  const { user } = useAuth();

  const steps = getSteps();

  function pushState(stateProp: any) {
    setState((prevState) => ({ ...prevState, ...stateProp }));
  }

  const handleReset = () => {
    pushState({ activeStep: 0 });
  };

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <ClientForm
            client={clientData}
            onAfterSubmit={(client) => {
              pushState({ clientData: client, activeStep: activeStep + 1 });
            }}
          />
        );
      case 1:
        return (
          <SignUpForm
            user={
              userData ||
              user ||
              (clientData?.id
                ? {
                    clientId: clientData.id,
                    name: clientData.name || "",
                    email: clientData
                      ? `${slugify(clientData.name)}@voidfloat.com.br`
                      : "",
                  }
                : undefined)
            }
            onAfterSubmit={(user) => {
              pushState({ userData: user, activeStep: activeStep + 1 });
            }}
          />
        );
      case 2:
        if (!networkConfigurationData) {
          pushState({ isLoading: true });
          networkConfigurationApi
            .get()
            .then((response) => {
              pushState({
                networkConfigurationData: response.data,
                isLoading: false,
              });
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
        }
        return networkConfigurationData ? (
          <NetworkConfigurationForm
            networkConfiguration={networkConfigurationData}
          />
        ) : null;
      case 3:
        return "Encontrar Pod's";
      default:
        return "Unknown step";
    }
  };

  useEffect(() => {
    pushState({ isLoading: true });
    clientApi.get().then((response) => {
      if (response.data) {
        return pushState({ isLoading: false, clientData: response.data });
      }
      pushState({ isLoading: false });
    });
  }, []);

  return !isLoading ? (
    <div className={classes.root}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps: any = {};
          const labelProps: any = {};
          return (
            <Step
              key={label}
              className={classes.stepButton}
              onClick={() =>
                activeStep >= index && pushState({ activeStep: index })
              }
              {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <div className={classes.stepContainer}>
        {activeStep === steps.length ? (
          <>
            <Typography className={classes.stepContainer}>
              All steps completed - you&apos;re finished
            </Typography>
            <Button onClick={handleReset} className={classes.button}>
              Reset
            </Button>
          </>
        ) : (
          getStepContent(activeStep)
        )}
      </div>
    </div>
  ) : (
    <CircularProgress color='secondary' />
  );
}
