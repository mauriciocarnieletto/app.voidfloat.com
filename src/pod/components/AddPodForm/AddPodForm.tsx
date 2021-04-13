import React from "react";
import TextField from "@material-ui/core/TextField";
import { Controller, useForm } from "react-hook-form";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { podApi } from "../../services/pod-api";
import {
  MessageHandlerActions,
  useMessageHandler,
} from "../../../services/handlers/MessageHandler";
import { Pod } from "../../interfaces";
import { ComponentForm } from "../../../interfaces";

export interface AddPodFormProps extends ComponentForm<Pod> {
  pod?: Pod;
}

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

export function ClientForm({ pod, onAfterSubmit }: AddPodFormProps) {
  const { id, name } = pod || { id: "", name: "" };
  const { control, handleSubmit } = useForm();
  const classes = useStyles();
  const { dispatch } = useMessageHandler();

  async function onSubmit(data: Pod) {
    try {
      await podApi.upsert(data);
      onAfterSubmit && onAfterSubmit(data);
    } catch (error) {
      dispatch({
        type: MessageHandlerActions.ERROR,
        payload: {
          type: MessageHandlerActions.ERROR,
          message: "Ocorreu um erro ao cadastrar o cliente",
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
          name='name'
          control={control}
          defaultValue={name}
          rules={{ required: true }}
          render={({ field }) => <TextField label='Nome' {...field} />}
        />
        <Button variant='contained' type='submit' color='primary'>
          {id ? "Enviar" : "Atualizar"}
        </Button>
      </div>
    </form>
  );
}
