import React from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Hidden from "@material-ui/core/Hidden";
import Poppers from "@material-ui/core/Popper";
import Divider from "@material-ui/core/Divider";
import Person from "@material-ui/icons/Person";
import Notifications from "@material-ui/icons/Notifications";
import VolumeOff from "@material-ui/icons/VolumeOff";
import VolumeUp from "@material-ui/icons/VolumeUp";
import Search from "@material-ui/icons/Search";

import CustomInput from "../CustomInput/CustomInput.js";
import Button from "../CustomButtons/Button.js";

import styles from "./headerLinksStyle.js";

const useStyles = makeStyles(styles);

export default function AdminNavbarLinks() {
  const classes = useStyles();
  const [openNotification, setOpenNotification] = React.useState(null);
  const [openProfile, setOpenProfile] = React.useState(null);
  const [notifications, setNotifications] = React.useState([]);
  const [isMuted, setIsMuted] = React.useState(false);

  React.useEffect(() => {
    setNotifications([]);
  }, []);

  const handleClickNotification = (event) => {
    if (openNotification && openNotification.contains(event.target)) {
      setOpenNotification(null);
    } else {
      setOpenNotification(event.currentTarget);
    }
  };
  const handleCloseNotification = () => {
    setOpenNotification(null);
  };
  const handleClickProfile = (event) => {
    if (openProfile && openProfile.contains(event.target)) {
      setOpenProfile(null);
    } else {
      setOpenProfile(event.currentTarget);
    }
  };
  const handleCloseProfile = () => {
    setOpenProfile(null);
  };
  return (
    <div>
      <div className={classes.searchWrapper}>
        <CustomInput
          formControlProps={{
            className: classes.margin + " " + classes.search,
          }}
          inputProps={{
            placeholder: "Pesquisar",
            inputProps: {
              "aria-label": "Pesquisar",
            },
          }}
        />
        <Button color='white' aria-label='edit' justIcon round>
          <Search />
        </Button>
      </div>
      <Button
        color={window.innerWidth > 959 ? "transparent" : "white"}
        justIcon={window.innerWidth > 959}
        simple={!(window.innerWidth > 959)}
        onClick={() => setIsMuted((prev) => !prev)}
        aria-label='Mute'
        className={classes.buttonLink}>
        {isMuted ? (
          <VolumeOff className={classes.icons} />
        ) : (
          <VolumeUp className={classes.icons} />
        )}
        <Hidden mdUp implementation='css'>
          <p className={classes.linkText}>Mute</p>
        </Hidden>
      </Button>
      <div className={classes.manager}>
        <Button
          color={window.innerWidth > 959 ? "transparent" : "white"}
          justIcon={window.innerWidth > 959}
          simple={!(window.innerWidth > 959)}
          aria-owns={openNotification ? "notification-menu-list-grow" : null}
          aria-haspopup='true'
          onClick={handleClickNotification}
          className={classes.buttonLink}>
          <Notifications className={classes.icons} />
          <span
            className={
              notifications.filter((notification) => notification.unread)
                .length > 0 && classes.notifications
            }>
            {notifications.filter((notification) => notification.unread)}
          </span>
          <Hidden mdUp implementation='css'>
            <p onClick={handleCloseNotification} className={classes.linkText}>
              Notifica????es
            </p>
          </Hidden>
        </Button>
        <Poppers
          open={Boolean(openNotification)}
          anchorEl={openNotification}
          transition
          disablePortal
          className={
            classNames({ [classes.popperClose]: !openNotification }) +
            " " +
            classes.popperNav
          }>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              id='notification-menu-list-grow'
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom",
              }}>
              <Paper>
                <ClickAwayListener onClickAway={handleCloseNotification}>
                  <MenuList role='menu'>
                    {notifications.map((notification) => (
                      <MenuItem
                        onClick={handleCloseNotification}
                        className={classes.dropdownItem}>
                        {notification.title}
                      </MenuItem>
                    ))}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Poppers>
      </div>
      <div className={classes.manager}>
        <Button
          color={window.innerWidth > 959 ? "transparent" : "white"}
          justIcon={window.innerWidth > 959}
          simple={!(window.innerWidth > 959)}
          aria-owns={openProfile ? "profile-menu-list-grow" : null}
          aria-haspopup='true'
          onClick={handleClickProfile}
          className={classes.buttonLink}>
          <Person className={classes.icons} />
          <Hidden mdUp implementation='css'>
            <p className={classes.linkText}>Perfil</p>
          </Hidden>
        </Button>
        <Poppers
          open={Boolean(openProfile)}
          anchorEl={openProfile}
          transition
          disablePortal
          className={
            classNames({ [classes.popperClose]: !openProfile }) +
            " " +
            classes.popperNav
          }>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              id='profile-menu-list-grow'
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom",
              }}>
              <Paper>
                <ClickAwayListener onClickAway={handleCloseProfile}>
                  <MenuList role='menu'>
                    <MenuItem
                      onClick={handleCloseProfile}
                      className={classes.dropdownItem}>
                      Perfil
                    </MenuItem>
                    <MenuItem
                      onClick={handleCloseProfile}
                      className={classes.dropdownItem}>
                      <Link to='/configuration'>Configura????es</Link>
                    </MenuItem>
                    <Divider light />
                    <MenuItem
                      onClick={handleCloseProfile}
                      className={classes.dropdownItem}>
                      Sair
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Poppers>
      </div>
    </div>
  );
}
