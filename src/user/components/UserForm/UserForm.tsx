import TextField from "@material-ui/core/TextField";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { userApi } from "../../services/user-api";

import { User } from "../../interfaces";
import { ComponentForm } from "../../../interfaces";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

export interface UserFormProps extends ComponentForm<User> {
  user?: User;
}

const USER_FORM_DEFAULT_VALUES: User = {
  id: "",
  name: "",
  username: "",
  password: "",
};

const useStyles = makeStyles((theme) => ({
  root: {
    height: theme.spacing(30),
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
  },
}));

export function UserForm({ user, onAfterSubmit }: UserFormProps) {
  const { id, name, username, password } = user || USER_FORM_DEFAULT_VALUES;
  const { control, handleSubmit } = useForm();
  const classes = useStyles();

  function onSubmit(data: User) {
    userApi.post(data);
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
          render={({ field }) => (
            <TextField fullWidth label='Nome' {...field} />
          )}
        />
        <Controller
          name='user'
          control={control}
          defaultValue={username}
          render={({ field }) => (
            <TextField fullWidth label='Email' {...field} />
          )}
        />
        <Controller
          name='user'
          control={control}
          defaultValue={password}
          render={({ field }) => (
            <TextField fullWidth type='password' label='Senha' {...field} />
          )}
        />
        <Button variant='contained' type='submit' color='secondary'>
          Criar Empresa
        </Button>
      </div>
    </form>
  );
}
