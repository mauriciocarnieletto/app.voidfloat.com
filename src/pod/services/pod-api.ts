import { api } from "../../services/api";
import { mockData } from "../services/mock-data";
import { Pod } from "../interfaces";

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
  get(): Promise<Pod[]> {
    return new Promise((resolve) => {
      resolve(mockData.pods);
    }); //api.get("/pod");
  },
  searchByIpAddres(ipAddress: string) {
    return api.get(`/pod/ip/${ipAddress}`);
  },
};
