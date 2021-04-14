import { makeStyles, Theme } from "@material-ui/core/styles";

const dashboardStyle = (theme: Theme) => ({
  root: {
    "& a": {
      color: "#3c4858",
    },
    "& .fc-day-today": {
      "& .fc-daygrid-day-frame": {
        backgroundColor: theme.palette.secondary.light,
      },
    },
  },
});

// @ts-ignore
export default makeStyles(dashboardStyle);
