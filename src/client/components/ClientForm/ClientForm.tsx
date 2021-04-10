import TextField from "@material-ui/core/TextField";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { clientApi } from "../../services/client-api";

import { Client } from "../../interfaces";
import { ComponentForm } from "../../../interfaces";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

export interface ClientFormProps extends ComponentForm<Client> {
  client?: Client;
}

const CLIENT_FORM_DEFAULT_VALUES: Client = {
  id: "",
  name: "",
};

const useStyles = makeStyles((theme) => ({
  root: {
    height: theme.spacing(20),
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
  },
}));

export function ClientForm({ client, onAfterSubmit }: ClientFormProps) {
  const { id, name } = client || CLIENT_FORM_DEFAULT_VALUES;
  const { control, handleSubmit } = useForm();
  const classes = useStyles();

  function onSubmit(data: Client) {
    clientApi.post(data);
    onAfterSubmit && onAfterSubmit(data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={classes.root}>
        <Controller
          name='id'
          control={control}
          defaultValue={id}
          render={({ field }) => <input type='hidden' {...field} />}
        />
        <Controller
          name='name'
          control={control}
          defaultValue={name}
          rules={{ required: true }}
          render={({ field }) => <TextField label='Nome' {...field} />}
        />
        <Button variant='contained' type='submit' color='secondary'>
          Criar Empresa
        </Button>
      </div>
    </form>
  );
}
