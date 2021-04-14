import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Grid, { GridProps } from "@material-ui/core/Grid";

const styles = {
  grid: {
    padding: "0 15px !important",
  },
};

const useStyles = makeStyles(styles);

export interface GridItemProps extends Partial<GridProps> {}

export default function GridItem(props: GridItemProps) {
  const classes = useStyles();
  const { children, ...rest } = props;
  return (
    <Grid item {...rest} className={classes.grid}>
      {children}
    </Grid>
  );
}

GridItem.propTypes = {
  children: PropTypes.node,
};
