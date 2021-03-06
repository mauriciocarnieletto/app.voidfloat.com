import { PodCommandDTO } from "../../configuration/interfaces";
import { api } from "../../services/api";
import { PodAction } from "../../pod-action/interfaces";
import {
  Pod,
  PodConfigurationCommand,
  PodConfigurationField,
} from "../interfaces";

export const podApi = {
  post(data: Pod) {
    return api.post("/pod", data);
  },
  put(id: string, data: Pod) {
    return api.patch(`/pod/${id}`, data);
  },
  async upsert(data: Pod) {
    if (data.id) {
      await this.put(data.id, data);
      return this.getById(data.id);
    } else {
      return this.post(data);
    }
  },
  getById(id: string) {
    return api.get(`/pod/${id}`);
  },
  get() {
    return api.get<Pod[]>("/pod");
  },
  searchByIpAddres(ipAddress: string) {
    return api.get(`/pod/ip/${ipAddress}`);
  },
  configuration: {
    commands: {
      get() {
        return api.get<PodConfigurationCommand[]>(
          "/pod-configuration-commands"
        );
      },
    },
    fields: {
      get() {
        return api.get<PodConfigurationField[]>("/pod-configuration-fields");
      },
    },
  },
  communication: {
    executeCommand: (podId: string, command: PodCommandDTO) => {
      return api.post<Pod[]>(`/pod-communication/command/${podId}`, command);
    },
  },
  actions: {
    get() {
      return api.get<PodAction[]>("/pod-actions");
    },
    execute(podId: string, actionId: number, data?: any) {
      return api.post(`/pod-communication/action/${podId}/${actionId}`, data);
    },
  },
};
