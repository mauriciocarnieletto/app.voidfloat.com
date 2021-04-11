import React, { createContext, useContext, useReducer } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";

export interface MessageHandlerContextProps {
  state: {
    messages: Message[];
  };
  dispatch: React.Dispatch<{
    type: MessageHandlerActions;
    payload: Message;
  }>;
}

export const MessageHandlerContext = createContext<MessageHandlerContextProps>({
  state: { messages: [] },
  dispatch: (value) => console.log(value),
});

export const useMessageHandler = () => useContext(MessageHandlerContext);

export enum MessageHandlerActions {
  SUCCESS = "success",
  ERROR = "error",
  WARN = "warning",
  INFO = "info",
  REMOVE = "REMOVE",
}

export interface Message {
  id?: string;
  type: MessageHandlerActions;
  message: string;
  description?: string;
}

const messageReducer = (
  state: { messages: Message[] },
  action: {
    type: MessageHandlerActions | "REMOVE";
    payload: Message;
  }
) => {
  const { type, payload } = action;

  if (type === "REMOVE") {
    state.messages = state.messages.filter((m) => m.id !== payload.id);
  } else {
    state.messages.push({
      ...payload,
      id: new Date().getTime().toString(),
    });
  }

  return { ...state };
};

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}

function Messages() {
  const {
    state: { messages },
    dispatch,
  } = useMessageHandler();
  return (
    <>
      {messages.map((message) => (
        <Snackbar
          key={message.id}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          autoHideDuration={6000}
          onClose={() =>
            dispatch({ type: MessageHandlerActions.REMOVE, payload: message })
          }
          open>
          <Alert
            severity={message.type as any}
            onClose={() =>
              dispatch({ type: MessageHandlerActions.REMOVE, payload: message })
            }>
            {message.message}
          </Alert>
        </Snackbar>
      ))}
    </>
  );
}

export function MessageHandlerProvider({
  children,
}: React.PropsWithChildren<{}>) {
  const [state, dispatch] = useReducer(messageReducer, { messages: [] });

  return (
    <MessageHandlerContext.Provider value={{ state, dispatch }}>
      <Messages />
      {children}
    </MessageHandlerContext.Provider>
  );
}
