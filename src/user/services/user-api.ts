import { api } from "../../services/api";
import { User } from "../interfaces";

export const userApi = {
  me() {
    return api.get<User>("/users/me");
  },
  get() {
    return api.get<User[]>("/users");
  },
  getById(id: number) {
    return api.get<User>(`/users/${id}`);
  },
  post(data: User) {
    return api.post<User>("/users", data);
  },
  async patch(id: number, data: User) {
    await api.patch(`/users/${id}`, data);
    return this.getById(id);
  },
  upsert(data: User) {
    if (data.id) return this.patch(data.id, data);
    return this.post(data);
  },
};
