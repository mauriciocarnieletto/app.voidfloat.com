import React from "react";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import logo from "../../../assets/images/logo.svg";

export const useStyles = makeStyles(({ palette, spacing }) =>
  createStyles({
    appHeader: {
      backgroundColor: palette.primary.dark,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: spacing(10),
    },
  })
);

export function PublicLayout({ children }: React.PropsWithChildren<{}>) {
  const classes = useStyles();

  return (
    <>
      <header className={classes.appHeader}>
        <img src={logo} alt='logo void' />
      </header>
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        {children}
      </Container>
    </>
  );
}
