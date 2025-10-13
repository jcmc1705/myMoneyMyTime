import DashboardRepository from "../../repository/DashboardRepository";
import { Dashboard } from "../../../domain/Dashboard";

export class GetDashboardUsecase {
  constructor(private repository: DashboardRepository) {}
  async execute(): Promise<Dashboard> {
    return await this.repository.getDashboard();
  }
}
