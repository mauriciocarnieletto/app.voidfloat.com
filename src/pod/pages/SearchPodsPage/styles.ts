import { makeStyles, Theme } from "@material-ui/core/styles";

const styles = (theme: Theme) => ({
  cardWrapper: {
    position: "relative",
  },
  cardWrapperOverlay: {
    position: "absolute",
    top: 0,
    zIndex: 1000,
    width: "100%",
    height: "100%",
  },
  cardWrapperContent: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
    height: "100%",
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.75)",
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
  form: {
    display: "flex",
  },
});
// @ts-ignore
export default makeStyles(styles);
