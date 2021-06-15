import {
  Button,
  Grid,
  makeStyles,
  Paper,
  Popper,
  PopperProps,
} from "@material-ui/core";
import React from "react";
import { useEffect, useState } from "react";
import { Pod } from "../../../pod/interfaces";
import { PodAction } from "../../interfaces";
import { podApi } from "../../../pod/services/pod-api";
import {
  MessageHandlerActions,
  useMessageHandler,
} from "../../../services/handlers/MessageHandler";
import { usePodActionContext } from "../../services/PodActionContext";

const useStyles = makeStyles(() => ({
  paper: {
    padding: 3,
  },
}));

export const ActionsPicker = React.memo(
  ({
    type,
    anchorEl,
    isOpen,
    pod,
  }: {
    type?: "STATE" | "CONSTANT";
    anchorEl: PopperProps["anchorEl"];
    isOpen: boolean;
    pod: Pod;
  }) => {
    const [actions, setActions] = useState<PodAction[]>();
    const classes = useStyles();
    const { dispatch } = useMessageHandler();
    const { setExecutingAction } = usePodActionContext();

    useEffect(() => {
      podApi.actions
        .get()
        .then((response) => {
          setActions(
            type
              ? response.data.filter((ac) => type === ac.type)
              : response.data
          );
        })
        .catch((error: Error) => {
          dispatch({
            type: MessageHandlerActions.ERROR,
            payload: {
              type: MessageHandlerActions.ERROR,
              message: `Ocorreu um erro ao buscar as ações dos pods. ${error.message} `,
              description: error.message,
            },
          });
        });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    async function handleActionClick(action: PodAction) {
      setExecutingAction(action);
    }

    return (
      <Popper anchorEl={anchorEl} open={isOpen}>
        <Paper className={classes.paper} elevation={3}>
          <Grid direction={"column"} container>
            {actions?.map((action) => (
              <Grid item>
                <Button onClick={() => handleActionClick(action)}>
                  {action.name}
                </Button>
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Popper>
    );
  }
);
