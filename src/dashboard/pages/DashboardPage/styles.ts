import { makeStyles } from "@material-ui/core/styles";

const dashboardStyle = {
  linkButton: {
    animation: "$run 1500ms linear infinite alternate",
  },
  "@keyframes run": {
    "0%": { marginLeft: 0 },
    "50%": { marginLeft: ".5rem" },
    "100%": { marginLeft: 0 },
  },
};

// @ts-ignore
export default makeStyles(dashboardStyle);
