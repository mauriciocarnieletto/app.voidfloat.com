import { makeStyles, Theme } from "@material-ui/core/styles";
import { dropdownStyle } from "../../../layout/resources/globalStyles";

const dashboardStyle = (theme: Theme) => ({
  ...dropdownStyle(theme),
});
// @ts-ignore
export default makeStyles(dashboardStyle);
