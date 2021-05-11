import React from "react";
import TextField from "@material-ui/core/TextField";
import { Controller, useForm } from "react-hook-form";
import Button from "@material-ui/core/Button";
import {
  MessageHandlerActions,
  useMessageHandler,
} from "../../../services/handlers/MessageHandler";
import { podApi } from "../../../pod/services/pod-api";
import { Pod } from "../../../pod/interfaces";
import { ComponentForm } from "../../../interfaces";
import { useStyles } from "./styles";

export interface AddPodFormProps extends ComponentForm<Pod> {
  pod?: Pod;
}

export function ExecutePodActionForm({ pod, onAfterSubmit }: AddPodFormProps) {
  const { id, name, hostname, ipAddress, serialNumber, model } = pod || {};
  const { control, handleSubmit } = useForm();
  const classes = useStyles();
  const { dispatch } = useMessageHandler();

  async function onSubmit(data: Pod) {
    try {
      await podApi.upsert(data);
      onAfterSubmit && onAfterSubmit(data);
      dispatch({
        type: MessageHandlerActions.SUCCESS,
        payload: {
          type: MessageHandlerActions.SUCCESS,
          message: data.id ? "O pod foi atualizado" : "O pod foi adicionado",
        },
      });
    } catch (error) {
      dispatch({
        type: MessageHandlerActions.ERROR,
        payload: {
          type: MessageHandlerActions.ERROR,
          message: "Ocorreu um erro ao cadastrar o pod",
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
        <Controller
          name='model'
          control={control}
          defaultValue={model}
          rules={{ required: true }}
          render={({ field }) => (
            <TextField label='Modelo' disabled={Boolean(model)} {...field} />
          )}
        />
        <Controller
          name='serialNumber'
          control={control}
          defaultValue={serialNumber}
          rules={{ required: true }}
          render={({ field }) => <TextField label='Serial' {...field} />}
        />
        <Controller
          name='ipAddress'
          control={control}
          defaultValue={ipAddress}
          rules={{ required: true }}
          render={({ field }) => (
            <TextField label='Endereço de IP' {...field} />
          )}
        />
        <Controller
          name='hostname'
          control={control}
          defaultValue={hostname}
          rules={{ required: true }}
          render={({ field }) => <TextField label='Hostname' {...field} />}
        />
        <Button variant='contained' type='submit' color='primary'>
          {!id ? "Enviar" : "Atualizar"}
        </Button>
      </div>
    </form>
  );
}
