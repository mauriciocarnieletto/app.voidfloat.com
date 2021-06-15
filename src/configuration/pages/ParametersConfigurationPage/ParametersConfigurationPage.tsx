import React, { useEffect, useState } from "react";
import {
  GridCellParams,
  GridColDef,
  GridValueGetterParams,
} from "@material-ui/data-grid";
import { IconButton } from "@material-ui/core";
import BuildIcon from "@material-ui/icons/Build";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import {
  Pod,
  PodConfigurationCommand,
  PodConfigurationField,
} from "../../../pod/interfaces";
import { podApi } from "../../../pod/services/pod-api";
import { ParametersTable } from "../../components/ParametersTable";
import { PodPicker } from "../../../pod/components/PodPicker";
import { PodCommandDTO } from "../../interfaces";
import {
  MessageHandlerActions,
  useMessageHandler,
} from "../../../services/handlers/MessageHandler";

const ActionColumn = (params: GridCellParams) => {
  const { executeInPod } = React.useContext(ConfigurationContext);
  const { dispatch } = useMessageHandler();

  function handleExecution() {
    if (executeInPod)
      podApi.communication
        .executeCommand(executeInPod?.id, params.row as PodCommandDTO)
        .then((response) => {
          dispatch({
            type: MessageHandlerActions.SUCCESS,
            payload: {
              type: MessageHandlerActions.SUCCESS,
              message: `O comando ${params.row.name} from executado com sucesso.`,
            },
          });
        })
        .catch((error) => {
          console.error(error);
          dispatch({
            type: MessageHandlerActions.ERROR,
            payload: {
              type: MessageHandlerActions.ERROR,
              message: `O comando ${params.row.name} falhou.`,
            },
          });
        });
  }

  return (
    <>
      <IconButton
        onClick={() => console.log("opening parameter configuration form")}>
        <EditIcon />
      </IconButton>
      <IconButton onClick={() => handleExecution()}>
        <PlayArrowIcon />
      </IconButton>
      <IconButton onClick={() => console.log("delete")}>
        <DeleteIcon />
      </IconButton>
    </>
  );
};

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
    renderCell: (params) => <ActionColumn {...params} />,
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
    renderCell: (params) => <ActionColumn {...params} />,
  },
];
interface ConfigurationContextProps {
  executeInPod?: Pod;
}
export const ConfigurationContext =
  React.createContext<ConfigurationContextProps>({});

export function ParametersConfigurationPage() {
  const [commands, setCommands] = useState<PodConfigurationCommand[]>([]);
  const [fields, setFields] = useState<PodConfigurationField[]>([]);
  const [podToCall, setPodToCall] = React.useState<Pod>();

  useEffect(() => {
    podApi.configuration.commands
      .get()
      .then((response) => setCommands(response.data));
    podApi.configuration.fields
      .get()
      .then((response) => setFields(response.data));
  }, []);

  return (
    <ConfigurationContext.Provider value={{ executeInPod: podToCall }}>
      <PodPicker onChange={(pod) => setPodToCall(pod)} />
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
    </ConfigurationContext.Provider>
  );
}
