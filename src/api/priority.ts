import { AxiosResponse } from "axios";
import { baseInstance } from "./base";
import { CreatePriority, GetPrioritiesParams, Priority } from "./models/priority.model";

export const getPriorities = (params?: GetPrioritiesParams): Promise<AxiosResponse<Priority[]>> => {
  return baseInstance.get("/priority", { params });
};
export const getPriority = (id: string): Promise<AxiosResponse<Priority>> => baseInstance.get(`/priority/${id}`);
export const createPriority = (body: CreatePriority): Promise<AxiosResponse<void>> =>
  baseInstance.post("/priority", body);
export const updatePriority = (body: Priority): Promise<AxiosResponse<void>> =>
  baseInstance.put(`/priority/${body.id}`, body);
export const deletePriority = (id: string): Promise<AxiosResponse<void>> => baseInstance.delete(`/priority/${id}`);
