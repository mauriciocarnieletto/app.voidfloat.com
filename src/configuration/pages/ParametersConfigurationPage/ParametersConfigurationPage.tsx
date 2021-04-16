import { GridColDef, GridValueGetterParams } from "@material-ui/data-grid";
import React, { useEffect, useState } from "react";
import BuildIcon from "@material-ui/icons/Build";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import {
  PodConfigurationCommand,
  PodConfigurationField,
} from "../../../pod/interfaces";
import { podApi } from "../../../pod/services/pod-api";
import { ParametersTable } from "../../components/ParametersTable";
import { IconButton } from "@material-ui/core";

const commandsColumns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "name", headerName: "Nome", width: 180 },
  { field: "description", headerName: "Descrição", width: 300 },
  {
    field: "command",
    headerName: "Comando",
    width: 110,
    valueGetter: (params: GridValueGetterParams) => params.value?.toString(),
  },
  {
    field: "",
    headerName: "",
    width: 180,
    renderHeader: () => <BuildIcon />,
    valueGetter: (params: GridValueGetterParams) => params.value?.toString(),
    renderCell: (params) => (
      <>
        <IconButton onClick={() => console.log(params)}>
          <EditIcon />
        </IconButton>
        <IconButton onClick={() => console.log(params)}>
          <PlayArrowIcon />
        </IconButton>
        <IconButton onClick={() => console.log(params)}>
          <DeleteIcon />
        </IconButton>
      </>
    ),
  },
];

const fieldsColumns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "name", headerName: "Nome", width: 180 },
  { field: "description", headerName: "Descrição", width: 300 },
  {
    field: "key",
    headerName: "Chave",
    width: 110,
  },
  {
    field: "value",
    headerName: "Valor",
    width: 110,
  },
  {
    field: "type",
    headerName: "Tipo",
    width: 110,
  },
  {
    field: "",
    headerName: "",
    width: 180,
    renderHeader: () => <BuildIcon />,
    valueGetter: (params: GridValueGetterParams) => params.value?.toString(),
    renderCell: (params) => (
      <>
        <IconButton onClick={() => console.log(params)}>
          <EditIcon />
        </IconButton>
        <IconButton onClick={() => console.log(params)}>
          <PlayArrowIcon />
        </IconButton>
        <IconButton onClick={() => console.log(params)}>
          <DeleteIcon />
        </IconButton>
      </>
    ),
  },
];

export function ParametersConfigurationPage() {
  const [commands, setCommands] = useState<PodConfigurationCommand[]>([]);
  const [fields, setFields] = useState<PodConfigurationField[]>([]);

  useEffect(() => {
    podApi.configuration.commands
      .get()
      .then((response) => setCommands(response.data));
    podApi.configuration.fields
      .get()
      .then((response) => setFields(response.data));
  }, []);

  return (
    <>
      <ParametersTable<PodConfigurationCommand>
        title='Comandos'
        subtitle='Os comandos que podem ser executados nas pods.'
        columns={commandsColumns}
        rows={commands}
      />

      <ParametersTable<PodConfigurationField>
        title='Comandos'
        subtitle='Os comandos que podem ser executados nas pods.'
        columns={fieldsColumns}
        rows={fields}
      />
    </>
  );
}
