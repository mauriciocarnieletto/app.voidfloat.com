import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import { UserForm } from "../../user/components/UserForm";
import { Client } from "../../client/interfaces";
import { ClientForm } from "../../client/components/ClientForm";
import { slugify } from "../../helpers";

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
  stepContainer: {
    width: "100%",
    marginTop: theme.spacing(6),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return ["Cliente", "Administrador", "Encontrar Pod's"];
}

export default function InitialSetupPage() {
  const classes = useStyles();
  const [canGoNext, setCanGoNext] = React.useState(true);
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [clientData, setClientData] = React.useState<Client>();
  const steps = getSteps();

  const isStepOptional = (step: number) => {
    return step === 1;
  };

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

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
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
          <UserForm
            user={{
              id: "",
              name: clientData?.name || "",
              username: clientData
                ? `${slugify(clientData.name)}@voidfloat.com.br`
                : "",
              password: "",
            }}
            onAfterSubmit={onAfterSubmit}
          />
        );
      case 2:
        return "Encontrar Pod's";
      default:
        return "Unknown step";
    }
  }

  return (
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
              onClick={() => setActiveStep(index)}
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
  );
}
