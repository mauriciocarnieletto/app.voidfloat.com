import React from "react";
import TextField from "@material-ui/core/TextField";
import { Controller, useForm } from "react-hook-form";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { networkConfigurationApi } from "../../services/server-configuration-api";
import {
  MessageHandlerActions,
  useMessageHandler,
} from "../../../services/handlers/MessageHandler";
import { NetworkConfiguration } from "../../interfaces";
import { ComponentForm } from "../../../interfaces";

export interface NetworkConfigurationFormProps
  extends ComponentForm<NetworkConfiguration> {
  networkConfiguration: NetworkConfiguration;
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

export function NetworkConfigurationForm({
  networkConfiguration,
  onAfterSubmit,
}: NetworkConfigurationFormProps) {
  const {
    id,
    name,
    clientId,
    sshPort,
    hostname,
    gatewayIp,
    localIp,
    publicIp,
    subnet,
    podPingEndpoint,
    podPort,
  } = networkConfiguration;

  const { control, handleSubmit } = useForm();
  const classes = useStyles();
  const { dispatch } = useMessageHandler();

  async function onSubmit(data: NetworkConfiguration) {
    try {
      await networkConfigurationApi.upsert(data);
      onAfterSubmit && onAfterSubmit(data);
    } catch (error) {
      dispatch({
        type: MessageHandlerActions.ERROR,
        payload: {
          type: MessageHandlerActions.ERROR,
          message: "Ocorreu um erro ao atualizar a interface de rede",
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
          rules={{ required: true }}
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
          name='sshPort'
          control={control}
          defaultValue={sshPort}
          rules={{ required: true }}
          render={({ field }) => (
            <TextField label='Porta SSH' {...field} disabled />
          )}
        />
        <Controller
          name='hostname'
          control={control}
          defaultValue={hostname}
          rules={{ required: true }}
          render={({ field }) => (
            <TextField label='Hostname' {...field} disabled />
          )}
        />
        <Controller
          name='gatewayIp'
          control={control}
          defaultValue={gatewayIp}
          rules={{ required: true }}
          render={({ field }) => (
            <TextField label='IP do Gateway' {...field} disabled />
          )}
        />
        <Controller
          name='localIp'
          control={control}
          defaultValue={localIp}
          rules={{ required: true }}
          render={({ field }) => (
            <TextField label='IP local' {...field} disabled />
          )}
        />
        <Controller
          name='publicIp'
          control={control}
          defaultValue={publicIp}
          rules={{ required: true }}
          render={({ field }) => (
            <TextField label='IP público' {...field} disabled />
          )}
        />
        <Controller
          name='subnet'
          control={control}
          defaultValue={subnet}
          rules={{ required: true }}
          render={({ field }) => (
            <TextField label='Subnet' {...field} disabled />
          )}
        />
        <Controller
          name='podPingEndpoint'
          control={control}
          defaultValue={podPingEndpoint}
          rules={{ required: true }}
          render={({ field }) => (
            <TextField
              label='Enpoint de ping para os pods'
              {...field}
              disabled
            />
          )}
        />
        <Controller
          name='podPort'
          control={control}
          defaultValue={podPort}
          rules={{ required: true }}
          render={({ field }) => (
            <TextField label='Porta da api do pod' {...field} disabled />
          )}
        />

        <Button variant='contained' type='submit' color='primary'>
          {!id ? "Enviar" : "Atualizar"}
        </Button>
      </div>
    </form>
  );
}
