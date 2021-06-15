export enum ActionTypes {
  STATE = "STATE",
  CONSTANT = "CONSTANT",
  CRON = "CRON",
}

export type PodAction = {
  id: number;
  name: string;
  key: string;
  type: ActionTypes;
  parameters: number[];
  data: {
    action: "setconfig" | "wait" | "command";
    data: number | Record<string, string | number>;
  }[];
};
