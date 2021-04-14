import clsx from "classnames";

import Poppers, { PopperProps } from "@material-ui/core/Popper";
import Divider from "@material-ui/core/Divider";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";

import { Pod } from "../../interfaces";
import useStyles from "./styles";

export interface PodActionsMenuProps extends Partial<PopperProps> {
  pod: Pod;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function PodActionsMenu({
  anchorEl,
  pod,
  isOpen,
  setIsOpen,
}: PodActionsMenuProps) {
  const classes = useStyles();
  const commandsMenu: {
    icon: React.FC;
    name: string;
    onClick: (pod: Pod) => void;
  }[] = [];

  function handleCloseMenu() {
    setIsOpen(false);
  }

  return (
    <Poppers
      open={isOpen}
      anchorEl={anchorEl}
      transition
      disablePortal
      className={
        clsx({ [classes.popperClose]: !isOpen }) + " " + classes.popperNav
      }>
      {({ TransitionProps, placement }) => (
        <Grow
          {...TransitionProps}
          style={{
            transformOrigin:
              placement === "bottom" ? "center top" : "center bottom",
          }}>
          <Paper>
            <ClickAwayListener onClickAway={handleCloseMenu}>
              <MenuList role='menu'>
                {commandsMenu?.map(({ name, onClick, icon: MenuIcon }) => (
                  <MenuItem
                    onClick={() => {
                      onClick(pod);
                      handleCloseMenu();
                    }}
                    className={classes.dropdownItem}>
                    <MenuIcon />
                    {name}
                  </MenuItem>
                ))}
                <MenuItem
                  onClick={handleCloseMenu}
                  className={classes.dropdownItem}>
                  Comandos
                </MenuItem>
                <MenuItem
                  onClick={handleCloseMenu}
                  className={classes.dropdownItem}>
                  Configurar
                </MenuItem>
                <Divider light />
                <MenuItem
                  onClick={handleCloseMenu}
                  className={classes.dropdownItem}>
                  Sair
                </MenuItem>
              </MenuList>
            </ClickAwayListener>
          </Paper>
        </Grow>
      )}
    </Poppers>
  );
}
