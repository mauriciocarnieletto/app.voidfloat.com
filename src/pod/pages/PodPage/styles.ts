import { makeStyles, Theme } from "@material-ui/core/styles";

const podScreenStyle = (theme: Theme) => ({
  root: {
    "& h1": {
      margin: 0,
    },
    "& h4": {
      margin: 0,
    },
  },
  modalBody: {
    position: "absolute",
    margin: "0 auto",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  iconContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: "1.5em",
  },
  icon: {
    marginTop: "0 !important",
    marginRight: "0 !important",
    float: "none",
    "& svg": {
      height: "2em",
      width: "2em",
    },
  },
});
// @ts-ignore
export default makeStyles(podScreenStyle);
