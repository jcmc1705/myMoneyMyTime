import { apiClient } from "./apiClient";
import { Dashboad } from "../../domain/dashboard";

export async function getDashboard() {
  return apiClient<Dashboad>(`/dashboard`);
}
