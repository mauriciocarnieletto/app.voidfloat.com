import { Pod } from "../interfaces";
import { podApi } from "./pod-api";

export const podActions = {
  DESLIGAR: async (pod: Pod) => podApi.actions.execute(pod.id, 1),
  PRE_SESSAO: async (pod: Pod) => podApi.actions.execute(pod.id, 2),
  SESSAO: async (pod: Pod) => null,
  LIMPEZA: async (pod: Pod) => podApi.actions.execute(pod.id, 4),
  MODO_NOTURNO: async (pod: Pod) => podApi.actions.execute(pod.id, 5),
  REPOUSO: async (pod: Pod) => podApi.actions.execute(pod.id, 6),
  ENTRE_SESSOES: async (pod: Pod) => podApi.actions.execute(pod.id, 7),
  DESLIGAR_ALARME: async (pod: Pod) => podApi.actions.execute(pod.id, 8),
};
