import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";

import { SignUpForm } from "../../auth/components/SignUpForm";
import { Client } from "../../client/interfaces";
import { ClientForm } from "../../client/components/ClientForm";
import { slugify } from "../../helpers";
import { clientApi } from "../../client/services/client-api";
import { User } from "../../user/interfaces";

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
  return ["Cadastrar Cliente", "Criar Usuário", "Configurar Servidor"];
}

export default function InitialSetupPage() {
  const classes = useStyles();
  const [isLoading, setIsLoading] = React.useState(false);
  const [canGoNext, setCanGoNext] = React.useState(true);
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [clientData, setClientData] = React.useState<Client>();
  const [userData, setUserData] = React.useState<User>();

  const steps = getSteps();

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  function onAfterSubmit() {
    setCanGoNext(true);
    handleNext();
  }

  function onBeforShowForm() {
    if (canGoNext) setCanGoNext(false);
  }

  function getStepContent(step: number) {
    switch (step) {
      case 0:
        onBeforShowForm();
        return (
          <ClientForm
            client={clientData}
            onAfterSubmit={(client) => {
              setClientData(client);
              onAfterSubmit();
            }}
          />
        );
      case 1:
        onBeforShowForm();
        return (
          clientData?.id && (
            <SignUpForm
              user={
                userData || {
                  clientId: clientData.id,
                  name: clientData?.name || "",
                  email: clientData
                    ? `${slugify(clientData.name)}@voidfloat.com.br`
                    : "",
                }
              }
              onAfterSubmit={(user) => {
                setUserData(user);
                onAfterSubmit();
              }}
            />
          )
        );
      case 2:
        return "Encontrar Pod's";
      default:
        return "Unknown step";
    }
  }

  useEffect(() => {
    setIsLoading(true);
    clientApi.get().then((response) => {
      if (response.data?.length === 1) setClientData(response.data[0]);
      setIsLoading(false);
    });
  }, []);

  return !isLoading ? (
    <div className={classes.root}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps: any = {};
          const labelProps: any = {};
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step
              key={label}
              className={classes.stepButton}
              onClick={() => activeStep >= index && setActiveStep(index)}
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
