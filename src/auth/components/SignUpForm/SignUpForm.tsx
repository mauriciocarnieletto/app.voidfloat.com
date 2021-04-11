import React from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Controller, useForm } from "react-hook-form";
import { authApi } from "../../services/auth-api";
import {
  useMessageHandler,
  MessageHandlerActions,
} from "../../../services/handlers/MessageHandler";
import { User } from "../../../user/interfaces";
import { ComponentForm } from "../../../interfaces";

export interface SignUpFormProps extends ComponentForm<User> {
  user?: User;
}

const USER_FORM_DEFAULT_VALUES: User = {
  clientId: 1,
  name: "",
  email: "",
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

export function SignUpForm({ user, onAfterSubmit }: SignUpFormProps) {
  const { id, name, email, password, clientId } =
    user || USER_FORM_DEFAULT_VALUES;
  const { control, handleSubmit } = useForm();
  const classes = useStyles();
  const { dispatch } = useMessageHandler();

  async function onSubmit(data: User) {
    try {
      await authApi.signUp(data);
      onAfterSubmit && onAfterSubmit(data);
    } catch (error) {
      dispatch({
        type: MessageHandlerActions.ERROR,
        payload: {
          type: MessageHandlerActions.ERROR,
          message: "Ocorreu um erro ao cadastrar o usuário",
          description: error.message,
        },
      });
    }
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
          name='clientId'
          control={control}
          defaultValue={clientId}
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
          name='email'
          control={control}
          defaultValue={email}
          render={({ field }) => (
            <TextField fullWidth label='Email' {...field} />
          )}
        />
        <Controller
          name='password'
          control={control}
          defaultValue={password}
          render={({ field }) => (
            <TextField fullWidth type='password' label='Senha' {...field} />
          )}
        />
        <Button variant='contained' type='submit' color='secondary'>
          {id ? "Atualizar" : "Cadastrar"}
        </Button>
      </div>
    </form>
  );
}
