import { podApi } from "./pod-api";

export const podActions = {
  DESLIGAR: async () => podApi.actions.execute("DESLIGAR"),
  PRE_SESSAO: async () => podApi.actions.execute("PRE_SESSAO"),
  SESSAO: async () => null,
  LIMPEZA: async () => podApi.actions.execute("LIMPEZA"),
  MODO_NOTURNO: async () => podApi.actions.execute("MODO_NOTURNO"),
  REPOUSO: async () => podApi.actions.execute("REPOUSO"),
  ENTRE_SESSOES: async () => podApi.actions.execute("ENTRE_SESSOES"),
  DESLIGAR_ALARME: async () => podApi.actions.execute("DESLIGAR_ALARME"),
};
