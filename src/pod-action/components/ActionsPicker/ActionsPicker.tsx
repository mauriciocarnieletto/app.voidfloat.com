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
import { PodAction } from "../../../pod/interfaces";
import { podApi } from "../../../pod/services/pod-api";

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
  }: {
    type?: "STATE" | "CONSTANT";
    anchorEl: PopperProps["anchorEl"];
    isOpen: boolean;
  }) => {
    const [actions, setActions] = useState<PodAction[]>();
    const classes = useStyles();

    useEffect(() => {
      podApi.actions.get().then((response) => {
        setActions(
          type ? response.data.filter((ac) => type === ac.type) : response.data
        );
      });
    }, []);

    return (
      <Popper anchorEl={anchorEl} open={isOpen}>
        <Paper className={classes.paper} elevation={3}>
          <Grid direction={"column"} container>
            {actions?.map((action) => (
              <Grid item>
                <Button>{action.name}</Button>
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Popper>
    );
  }
);
