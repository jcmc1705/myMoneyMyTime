import HttpClient from "../http/HttpClient";
import { Dashboard } from "../../domain/Dashboard";

export default interface DashboardGateway {
  getDashboard(): Promise<Dashboard>;
}

export class DashboardGatewayHttp implements DashboardGateway {
  constructor(private httpClient: HttpClient) {}

  async getDashboard(): Promise<Dashboard> {
    return await this.httpClient.get<Dashboard>("/dashboard");
  }
}
