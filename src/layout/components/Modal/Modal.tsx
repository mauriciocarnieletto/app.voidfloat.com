import React from "react";
import { Modal as MuiModal, Paper } from "@material-ui/core";
import useStyles from "./styles";

export const Modal: React.FC<{ open: boolean }> = ({ open, children }) => {
  const classes = useStyles();
  return (
    <MuiModal open={open}>
      <div className={classes.modalBody}>
        <Paper>{children}</Paper>
      </div>
    </MuiModal>
  );
};
