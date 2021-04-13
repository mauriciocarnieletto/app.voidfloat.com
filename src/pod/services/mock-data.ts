import { Pod, EquipmentStatus, MachineStates } from "../interfaces";

export const mockData: { pods: Pod[] } = {
  pods: [
    {
      id: "dae12e-e21e1-e12e12e-e12e12e",
      name: "Sala 30",
      connection: {
        isConnected: true,
        status: EquipmentStatus.OK,
      },
      screen: {
        actualTemperature: 34,
        actualTime: "10:20",
        cooler: true,
        coolerRPM: 30,
        remainingTime: "10:20",
        sessionStatus: MachineStates.SESSAO,
        status: "OK",
        fwVersion: "1.0.1",
        finalMusicFile: "Music 1",
        initialMusicFile: "Music 1",
        discEquipStatus: EquipmentStatus.OK,
        serverEquipStatus: EquipmentStatus.OK,
        systemEquipStatus: EquipmentStatus.OK,
      },
    },
    {
      id: "dae12e-e21e1-e12e12e-e12e12e",
      name: "Sala 31",
      connection: {
        isConnected: true,
        status: EquipmentStatus.OK,
      },
      screen: {
        actualTemperature: 34,
        actualTime: "10:20",
        cooler: true,
        coolerRPM: 30,
        remainingTime: "10:20",
        sessionStatus: MachineStates.SESSAO,
        status: "OK",
        fwVersion: "1.0.1",
        finalMusicFile: "Music 1",
        initialMusicFile: "Music 1",
        discEquipStatus: EquipmentStatus.OK,
        serverEquipStatus: EquipmentStatus.OK,
        systemEquipStatus: EquipmentStatus.OK,
      },
    },
  ],
};
