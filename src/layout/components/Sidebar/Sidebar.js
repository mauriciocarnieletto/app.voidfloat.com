import React from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import Icon from "@material-ui/core/Icon";

import AdminNavbarLinks from "../Navbars/AdminNavbarLinks.js";

import styles from "./sidebarStyle.js";

const useStyles = makeStyles(styles);

export default function Sidebar(props) {
  const classes = useStyles();

  function isActiveRoute(routeName) {
    return window.location.href.indexOf(routeName) > -1 ? true : false;
  }

  const { color, logo, image, routes } = props;
  var links = (
    <List className={classes.list}>
      {routes.map((prop, key) => {
        let listItemClasses;
        const RouteIcon = prop.icon;

        listItemClasses = classNames({
          [" " + classes[color]]: isActiveRoute(prop.path),
        });

        const whiteFontClasses = classNames({
          [" " + classes.whiteFont]: isActiveRoute(prop.path),
        });

        return (
          <NavLink
            to={prop.path}
            className={classes.item}
            activeClassName='active'
            key={key}>
            <ListItem button className={classes.itemLink + listItemClasses}>
              {props.icon &&
                (typeof RouteIcon === "string" ? (
                  <Icon
                    className={classNames(
                      classes.itemIcon,
                      whiteFontClasses,
                      {}
                    )}>
                    {RouteIcon}
                  </Icon>
                ) : (
                  <RouteIcon
                    className={classNames(
                      classes.itemIcon,
                      whiteFontClasses,
                      {}
                    )}
                  />
                ))}
              <ListItemText
                primary={prop.name}
                className={classNames(classes.itemText, whiteFontClasses, {})}
                disableTypography={true}
              />
            </ListItem>
          </NavLink>
        );
      })}
    </List>
  );
  var brand = (
    <div className={classes.logo}>
      <Link to='/'>
        <div className={classes.logoImage}>
          <img src={logo} alt='logo' className={classes.img} />
        </div>
      </Link>
    </div>
  );
  return (
    <div>
      <Hidden mdUp implementation='css'>
        <Drawer
          variant='temporary'
          anchor={"right"}
          open={props.open}
          classes={{
            paper: classNames(classes.drawerPaper, {}),
          }}
          onClose={props.handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}>
          {brand}
          <div className={classes.sidebarWrapper}>
            <AdminNavbarLinks />
            {links}
          </div>
          {image !== undefined ? (
            <div
              className={classes.background}
              style={{ backgroundImage: "url(" + image + ")" }}
            />
          ) : null}
        </Drawer>
      </Hidden>
      <Hidden smDown implementation='css'>
        <Drawer
          anchor={"left"}
          variant='permanent'
          open
          classes={{
            paper: classNames(classes.drawerPaper),
          }}>
          {brand}
          <div className={classes.sidebarWrapper}>{links}</div>
          {image !== undefined ? (
            <div
              className={classes.background}
              style={{ backgroundImage: "url(" + image + ")" }}
            />
          ) : null}
        </Drawer>
      </Hidden>
    </div>
  );
}

Sidebar.propTypes = {
  handleDrawerToggle: PropTypes.func,
  bgColor: PropTypes.oneOf(["purple", "blue", "green", "orange", "red"]),
  logo: PropTypes.string,
  image: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object),
  open: PropTypes.bool,
};
