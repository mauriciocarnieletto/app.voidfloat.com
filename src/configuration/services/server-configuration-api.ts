import { api } from "../../services/api";
import { NetworkConfiguration } from "../interfaces";

export const networkConfigurationApi = {
  get() {
    return api.get<NetworkConfiguration>(`/config/server/network`);
  },
  put(data: NetworkConfiguration) {
    return api.put<NetworkConfiguration>(`/config/server/network`, data);
  },
  upsert(data: NetworkConfiguration) {
    return this.put(data);
  },
};

export const serverConfigurationApi = {};
