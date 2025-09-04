import GetDashboardUsecase from "../../application/usecase/GetDashboardUsecase";
import HttpServer from "../http/httpServer";

export default class DashboardController {
  constructor(
    readonly httpServer: HttpServer,
    readonly getDashboardUsecase: GetDashboardUsecase,
  ) {
    httpServer.register(
      "get",
      "/api/dashboard",
      async (params: any, query: any, body: any) => {
        const output = await getDashboardUsecase.execute();
        return output;
      },
    );
  }
}
