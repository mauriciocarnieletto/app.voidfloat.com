import TextField from "@material-ui/core/TextField";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { clientApi } from "../../services/client-api";

import { Client } from "../../interfaces";
import { ComponentForm } from "../../../interfaces";

export interface ClientFormProps extends ComponentForm<Client> {
  client?: Client;
}

const CLIENT_FORM_DEFAULT_VALUES: Client = {
  id: "",
  name: "",
};

export function ClientForm({ client, onAfterSubmit }: ClientFormProps) {
  const { id, name } = client || CLIENT_FORM_DEFAULT_VALUES;
  const { control, handleSubmit } = useForm();

  function onSubmit(data: Client) {
    clientApi.post(data);
    onAfterSubmit && onAfterSubmit(data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name='id'
        control={control}
        defaultValue={id}
        render={(field) => <input type='hidden' {...field} />}
      />
      <Controller
        name='name'
        control={control}
        defaultValue={name}
        render={(field) => <TextField label='Nome' {...field} />}
      />
    </form>
  );
}
