import "./layout.css";
import "perfect-scrollbar/css/perfect-scrollbar.css";

import React from "react";
import PerfectScrollbar from "perfect-scrollbar";
import { makeStyles } from "@material-ui/core/styles";
import Navbar from "../Navbars/Navbar";
import Footer from "../Footer/Footer";
import Sidebar from "../Sidebar/Sidebar";
import { AuthProvider } from "../../../auth/services/AuthContext";

import { appRoutes } from "../../../app-routes";

import styles from "./adminStyle";

import image from "../../../assets/images/sidebar-2.png";
import logo from "../../../assets/images/logo.svg";

let ps;

const useStyles = makeStyles(styles);

export function PrivateLayout({ children, ...rest }) {
  const classes = useStyles();
  const mainPanel = React.createRef();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const resizeFunction = () => {
    if (window.innerWidth >= 960) {
      setMobileOpen(false);
    }
  };
  // initialize and destroy the PerfectScrollbar plugin
  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(mainPanel.current, {
        suppressScrollX: true,
        suppressScrollY: false,
      });
      document.body.style.overflow = "hidden";
    }
    window.addEventListener("resize", resizeFunction);
    // Specify how to clean up after this effect:
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
      }
      window.removeEventListener("resize", resizeFunction);
    };
  }, [mainPanel]);
  return (
    <AuthProvider>
      <div className={classes.wrapper}>
        <Sidebar
          routes={appRoutes.filter((r) => r.showOnMenu)}
          logo={logo}
          color='primary'
          image={image}
          handleDrawerToggle={handleDrawerToggle}
          open={mobileOpen}
          {...rest}
        />
        <div className={classes.mainPanel} ref={mainPanel}>
          <Navbar
            routes={appRoutes}
            handleDrawerToggle={handleDrawerToggle}
            {...rest}
          />
          <div className={classes.content}>
            <div className={classes.container}>{children}</div>
          </div>
          <Footer />
        </div>
      </div>
    </AuthProvider>
  );
}
