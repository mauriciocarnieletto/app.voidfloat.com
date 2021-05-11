import React from "react";
import { Pod } from "../../../interfaces";
import { Grid, Switch } from "@material-ui/core";

export const CommonDashboard = ({ pod }: { pod: Pod }) => (
  <Grid item xs={12}>
    <p>
      Temperatura:{" "}
      {pod.screen?.actualTemperature &&
        `${pod.screen?.actualTemperature.toFixed(2)} °C`}
    </p>
    <p>
      Leds:{" "}
      {pod?.status && (
        <Switch
          checked={pod.status.leds}
          value='active'
          color='primary'
          name='Leds'
        />
      )}
    </p>
    <p>
      Som:{" "}
      {pod?.status && (
        <Switch
          checked={pod.status.som}
          value='active'
          color='primary'
          name='Som'
        />
      )}
    </p>
    <p>
      Cooler:{" "}
      {pod?.status && (
        <Switch
          checked={pod.status.cooler}
          value='active'
          color='primary'
          name='cooler'
        />
      )}
    </p>
    <p>
      Velocidade Cooler:{" "}
      {pod.screen?.rpmCooler && `${pod.screen?.rpmCooler} rpm`}{" "}
    </p>
  </Grid>
);
