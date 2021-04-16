import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import { DataGrid, GridColDef } from "@material-ui/data-grid";

import GridItem from "../../../layout/components/Grid/GridItem";
import GridContainer from "../../../layout/components/Grid/GridContainer";
import Card from "../../../layout/components/Card/Card";
import CardHeader from "../../../layout/components/Card/CardHeader";
import CardBody from "../../../layout/components/Card/CardBody";

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0",
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF",
    },
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1",
    },
  },
};

// @ts-ignore
const useStyles = makeStyles(styles);

export interface ParametersTableInterface<T> {
  title: string;
  subtitle?: string;
  color?: string;
  columns: GridColDef[];
  rows?: T[];
  checkboxSelection?: boolean;
}

export function ParametersTable<T>({
  title = "",
  subtitle = "",
  color = "primary",
  columns = [],
  rows = [],
  checkboxSelection = false,
}: ParametersTableInterface<T>) {
  const classes = useStyles();

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color={color}>
            <h4 className={classes.cardTitleWhite}>{title}</h4>
            <p className={classes.cardCategoryWhite}>{subtitle}</p>
          </CardHeader>
          <CardBody>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              pagination
              checkboxSelection={checkboxSelection}
              autoHeight
            />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
