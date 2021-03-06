import React from "react";
import TextField from "@material-ui/core/TextField";
import { Controller, useForm } from "react-hook-form";
import Button from "@material-ui/core/Button";
import { networkConfigurationApi } from "../../services/server-configuration-api";
import {
  MessageHandlerActions,
  useMessageHandler,
} from "../../../services/handlers/MessageHandler";
import { NetworkConfiguration } from "../../interfaces";
import { ComponentForm } from "../../../interfaces";
import GridContainer from "../../../layout/components/Grid/GridContainer";
import GridItem from "../../../layout/components/Grid/GridItem";

export interface NetworkConfigurationFormProps
  extends ComponentForm<NetworkConfiguration> {
  networkConfiguration?: NetworkConfiguration;
}

const navigationConfigurationDefaults = {
  id: undefined,
  name: "",
  clientId: "",
  sshPort: "",
  hostname: "",
  gatewayIp: "",
  localIp: "",
  publicIp: "",
  subnet: "",
  podPingEndpoint: "",
  podPort: "",
};

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
  } = networkConfiguration || navigationConfigurationDefaults;

  const { control, handleSubmit } = useForm();
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
    <GridContainer>
      <GridItem xs={12}>
        <form onSubmit={handleSubmit(onSubmit)}>
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
          <GridContainer>
            <GridItem xs={12}>
              <Controller
                name='name'
                control={control}
                defaultValue={name}
                rules={{ required: true }}
                render={({ field }) => <TextField label='Nome' {...field} />}
              />
            </GridItem>

            <GridItem xs={12}>
              <Controller
                name='sshPort'
                control={control}
                defaultValue={sshPort}
                rules={{ required: true }}
                render={({ field }) => (
                  <TextField label='Porta SSH' {...field} />
                )}
              />
            </GridItem>

            <GridItem xs={12}>
              <Controller
                name='hostname'
                control={control}
                defaultValue={hostname}
                rules={{ required: true }}
                render={({ field }) => (
                  <TextField label='Hostname' {...field} />
                )}
              />
            </GridItem>

            <GridItem xs={12}>
              <Controller
                name='gatewayIp'
                control={control}
                defaultValue={gatewayIp}
                rules={{ required: true }}
                render={({ field }) => (
                  <TextField label='IP do Gateway' {...field} />
                )}
              />
            </GridItem>

            <GridItem xs={12}>
              <Controller
                name='localIp'
                control={control}
                defaultValue={localIp}
                rules={{ required: true }}
                render={({ field }) => (
                  <TextField label='IP local' {...field} />
                )}
              />
            </GridItem>

            <GridItem xs={12}>
              <Controller
                name='publicIp'
                control={control}
                defaultValue={publicIp}
                rules={{ required: true }}
                render={({ field }) => (
                  <TextField label='IP p??blico' {...field} />
                )}
              />
            </GridItem>

            <GridItem xs={12}>
              <Controller
                name='subnet'
                control={control}
                defaultValue={subnet}
                rules={{ required: true }}
                render={({ field }) => <TextField label='Subnet' {...field} />}
              />
            </GridItem>

            <GridItem xs={12}>
              <Controller
                name='podPingEndpoint'
                control={control}
                defaultValue={podPingEndpoint}
                rules={{ required: true }}
                render={({ field }) => (
                  <TextField label='Enpoint de ping para os pods' {...field} />
                )}
              />
            </GridItem>

            <GridItem xs={12}>
              <Controller
                name='podPort'
                control={control}
                defaultValue={podPort}
                rules={{ required: true }}
                render={({ field }) => (
                  <TextField label='Porta da api do pod' {...field} />
                )}
              />
            </GridItem>
          </GridContainer>

          <Button variant='contained' type='submit' color='primary'>
            {!id ? "Enviar" : "Atualizar"}
          </Button>
        </form>
      </GridItem>
    </GridContainer>
  );
}
