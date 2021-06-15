import { makeStyles, Theme } from "@material-ui/core/styles";

const podStatesStyle = (theme: Theme) => ({
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
});
// @ts-ignore
export default makeStyles(podStatesStyle);
