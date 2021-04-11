import { api } from "../../services/api";
import { Client } from "../interfaces";

export const clientApi = {
  async post(client: Client) {
    return api.post<Client>("/client", client);
  },
  async put(client: Client) {
    await api.patch<Client>(`/client/${client.id}`, client);
    return this.get();
  },
  async upsert(client: Client) {
    if (client.id) {
      return this.put(client);
    }
    return this.post(client);
  },
  async get() {
    return api.get<Client[]>("/client");
  },
};
