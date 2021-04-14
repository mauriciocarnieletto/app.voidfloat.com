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
import GridContainer from "../../../layout/components/Grid/GridContainer";
import GridItem from "../../../layout/components/Grid/GridItem";
import Card from "../../../layout/components/Card/Card";
import CardHeader from "../../../layout/components/Card/CardHeader";
import CardBody from "../../../layout/components/Card/CardBody";
import CardFooter from "../../../layout/components/Card/CardFooter";

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

const useStyles = makeStyles((theme) => ({
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: 300,
    marginBottom: "3px",
    textDecoration: "none",
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
  } = networkConfiguration || navigationConfigurationDefaults;

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
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Card>
            <CardHeader color='warning'>
              <h3 className={classes.cardTitleWhite}>Configurações de Rede</h3>
              Configurações de comunicação entre o server e as pods.
            </CardHeader>
            <CardBody>
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
                <GridItem xs={12} sm={12} md={4}>
                  <Controller
                    name='name'
                    control={control}
                    defaultValue={name}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <TextField label='Nome' {...field} />
                    )}
                  />
                </GridItem>

                <GridItem xs={12} sm={12} md={4}>
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

                <GridItem xs={12} sm={12} md={4}>
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

                <GridItem xs={12} sm={12} md={4}>
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

                <GridItem xs={12} sm={12} md={4}>
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

                <GridItem xs={12} sm={12} md={4}>
                  <Controller
                    name='publicIp'
                    control={control}
                    defaultValue={publicIp}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <TextField label='IP público' {...field} />
                    )}
                  />
                </GridItem>

                <GridItem xs={12} sm={12} md={4}>
                  <Controller
                    name='subnet'
                    control={control}
                    defaultValue={subnet}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <TextField label='Subnet' {...field} />
                    )}
                  />
                </GridItem>

                <GridItem xs={12} sm={12} md={4}>
                  <Controller
                    name='podPingEndpoint'
                    control={control}
                    defaultValue={podPingEndpoint}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <TextField
                        label='Enpoint de ping para os pods'
                        {...field}
                      />
                    )}
                  />
                </GridItem>

                <GridItem xs={12} sm={12} md={4}>
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
            </CardBody>
            <CardFooter>
              <Button variant='contained' type='submit' color='primary'>
                {!id ? "Enviar" : "Atualizar"}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </GridItem>
    </GridContainer>
  );
}
