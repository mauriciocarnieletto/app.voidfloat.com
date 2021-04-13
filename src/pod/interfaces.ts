export enum MachineStates {
  TURN_OFF = 0,
  PRE_SESSAO = 1,
  SESSAO = 2,
  SESSAO_LIMPEZA = 3,
  SESSAO_NOTURNO = 4,
  SESSAO_REPOUSO = 5,
  DELAY_SESSAO = 6,
}

export enum EquipmentStatus {
  OK = 0,
  Warning = 1,
  Error = 2,
}
export interface PodScreenData {
  status: "OK";
  sessionStatus: MachineStates;
  /**
   * Tempo restante do estado ou --:-- quando não disponível,
   */
  remainingTime: string;
  /**
   * Temperatura atual da agua,
   */
  actualTemperature: number;
  /**
   * Status do cooler
   */
  cooler: boolean;
  /**
   * Velocidade da ventoinha de 450 a 2000,
   */
  coolerRPM: number;
  /**
   * String com o nome da musica inicial
   */
  initialMusicFile: string;
  /**
   * String com o nome da musica final,
   */
  finalMusicFile: string;
  /**
   * String com o horário atual do equipamento,
   */
  actualTime: string;
  /**
   * String com a versao de firmware,
   */
  fwVersion: string;
  /**
   * Status do sistema do equipamento
   * 0 - OK
   * 1 - Atenção,
   * 2 - Problema no sistema que nao tem a ver com disco e conexao com servidor,
   */
  systemEquipStatus: EquipmentStatus;
  /**
   * Stus do disco do equipamento
   * 0 - OK
   * 1 - Atenção
   * 2 - Problema no SD
   */
  discEquipStatus: EquipmentStatus;
  /**
   * Indica o status de comunicação com o servidor
   * 0 - OK
   * 1 - Atenção
   * 2 - Problema na conexao com o servidor
   */
  serverEquipStatus: EquipmentStatus;
}

export interface Pod {
  id: string;
  name: string;
  connection: {
    status: EquipmentStatus;
    isConnected: boolean;
  };
  screen: PodScreenData;
}
