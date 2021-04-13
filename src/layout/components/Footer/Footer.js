import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import styles from "./footerStyle.js";

const useStyles = makeStyles(styles);

export default function Footer(props) {
  const classes = useStyles();
  return (
    <footer className={classes.footer}>
      <div className={classes.container}>
        <div className={classes.left}>
          <List className={classes.list}>
            <ListItem className={classes.inlineBlock}>
              <a href='#home' className={classes.block}>
                Home
              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a
                href='https://voidfloat.com.br'
                target='_blank'
                rel='noreferrer'
                className={classes.block}>
                Empresa
              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a
                href='https://voidfloat.com.br/#blog'
                target='_blank'
                rel='noreferrer'
                className={classes.block}>
                Blog
              </a>
            </ListItem>
          </List>
        </div>
        <p className={classes.right}>
          <span>&copy; {1900 + new Date().getYear()} </span>
        </p>
      </div>
    </footer>
  );
}
