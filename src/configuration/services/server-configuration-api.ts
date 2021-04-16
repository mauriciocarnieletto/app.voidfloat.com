import { Pod } from "../../pod/interfaces";
import { api } from "../../services/api";
import { NetworkConfiguration } from "../interfaces";

export const networkConfigurationApi = {
  get() {
    return api.get<NetworkConfiguration>(`/setup/server/network`);
  },
  put(data: NetworkConfiguration) {
    return api.patch<NetworkConfiguration>(`/setup/server/network`, data);
  },
  upsert(data: NetworkConfiguration) {
    return this.put(data);
  },
  searchPods() {
    return api.get<Pod[]>("/network/search-pods");
  },
};

export const serverConfigurationApi = {};
