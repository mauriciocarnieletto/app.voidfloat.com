import React from "react";
import { Link } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import useStyles from "./styles";

export function DashboardPage() {
  const classes = useStyles();
  return (
    <div>
      <h1>Bem vindo(a)</h1>{" "}
      <div>
        <Link to='/pods'>
          Ver meus pods
          <IconButton className={classes.linkButton}>
            <ArrowBackIcon />
          </IconButton>
        </Link>
      </div>
    </div>
  );
}
