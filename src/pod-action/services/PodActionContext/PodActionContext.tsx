import React, { createContext, useContext, useEffect, useState } from "react";
import { Pod } from "../../../pod/interfaces";
import { ExecuteActionForm } from "../../components/ExecuteActionForm";
import { podApi } from "../../../pod/services/pod-api";
import { useAppContext } from "../../../services/AppContext";
import {
  MessageHandlerActions,
  useMessageHandler,
} from "../../../services/handlers/MessageHandler";
import { PodAction } from "../../interfaces";

interface PodActionContextProps {
  pod: Pod;
  setPod: React.Dispatch<Pod>;
  executingAction?: PodAction;
  setExecutingAction: React.Dispatch<PodAction>;
}

export const PodActionContext = createContext<PodActionContextProps>(
  {} as PodActionContextProps
);

export const PodActionContextProvider = ({
  children,
  pod: podParam,
}: React.PropsWithChildren<{ pod: Pod }>) => {
  const [pod, setPod] = useState<Pod>(podParam);
  const [executingAction, setExecutingAction] = useState<PodAction>();
  const [executingActionForm, setExecutingActionForm] = useState<PodAction>();
  const { dispatch } = useMessageHandler();
  const { setLoading } = useAppContext();

  function handleFormSubmit(data: any) {
    console.log(data);
  }

  async function executeAction(pod: Pod, action: PodAction) {
    setLoading(true);

    function onAfterRequest() {
      setLoading(false);
      setExecutingAction(undefined);
    }
    try {
      const result = await podApi.actions.execute(
        pod.id,
        action.id,
        action.data
      );

      if (![200, 201].includes(result.status)) {
        throw new Error("Ocorreu um erro ao enviar o comando ao pod.");
      }

      dispatch({
        type: MessageHandlerActions.SUCCESS,
        payload: {
          type: MessageHandlerActions.SUCCESS,
          message: `O comando foi enviado com sucesso.`,
        },
      });

      onAfterRequest();
    } catch (error) {
      dispatch({
        type: MessageHandlerActions.ERROR,
        payload: {
          type: MessageHandlerActions.ERROR,
          message: `Ocorreu um erro ao buscar as ações dos pods. ${error.message} `,
          description: error.message,
        },
      });

      onAfterRequest();
    }
  }

  useEffect(() => setPod(podParam), [podParam]);

  useEffect(() => {
    if (executingAction) {
      if (!executingAction.parameters) executeAction(pod, executingAction);
      else setExecutingActionForm(executingAction);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pod, executingAction]);

  return (
    <PodActionContext.Provider
      value={{
        pod,
        setPod,
        executingAction,
        setExecutingAction,
      }}>
      {executingActionForm && (
        <ExecuteActionForm
          pod={pod}
          action={executingActionForm}
          onSubmit={handleFormSubmit}
        />
      )}
      {children}
    </PodActionContext.Provider>
  );
};

export const usePodActionContext = () => useContext(PodActionContext);
