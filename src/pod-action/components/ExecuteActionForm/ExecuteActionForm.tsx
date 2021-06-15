import React, { useEffect, useState } from "react";
import { Button, TextField } from "@material-ui/core";
import { Controller, useForm } from "react-hook-form";

import { Modal } from "../../../layout/components/Modal";
import { podApi } from "../../../pod/services/pod-api";

import {
  Pod,
  PodConfigurationCommand,
  PodConfigurationField,
} from "../../../pod/interfaces";
import { PodAction } from "../../interfaces";

export const ExecuteActionForm = ({
  pod,
  action,
  onSubmit,
}: {
  pod: Pod;
  action: PodAction;
  onSubmit: ({ podParams }: { podParams: any }) => void;
}) => {
  const { control, handleSubmit } = useForm();
  const [commands, setCommands] = useState<PodConfigurationCommand[]>([]);
  const [configFields, setConfigFields] = useState<PodConfigurationField[]>([]);

  function handleFormSubmit(data: any) {
    onSubmit(data);
  }

  useEffect(() => {
    podApi.configuration.commands
      .get()
      .then((response) => setCommands(response.data));
    podApi.configuration.fields
      .get()
      .then(({ data }) =>
        setConfigFields(
          data.filter((config) => action.parameters.includes(config.id))
        )
      );
  }, [pod, action]);

  return (
    <Modal open={true}>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <>{action.name}</>
        {configFields?.map((c) => (
          <div key={c.id}>
            {c.name}
            {["string", "number"].includes(c.type) ? (
              <Controller
                control={control}
                name={c.key}
                defaultValue={c.defaultValue}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id={c.key}
                    name={c.key}
                    defaultValue={c.defaultValue}
                    type={c.type === "number" ? c.type : undefined}
                    InputProps={
                      c.type === "number"
                        ? {
                            inputProps: {
                              min: c.numberMin,
                              max: c.numberMax,
                            },
                          }
                        : {}
                    }
                  />
                )}
              />
            ) : (
              <>Sei não</>
            )}
          </div>
        ))}
        <Button variant='contained' type='submit'>
          {action.name}
        </Button>
      </form>
    </Modal>
  );
};
