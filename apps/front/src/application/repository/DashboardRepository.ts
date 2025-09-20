import { Dashboard } from "../../domain/Dashboard";

export default interface DashboardRepository {
  getDashboard(): Promise<Dashboard>;
}
