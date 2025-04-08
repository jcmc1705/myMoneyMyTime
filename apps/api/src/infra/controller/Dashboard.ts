import { GetDashboardUseCase } from "../../application/usercase/getDashboardUserCase";
import HttpServer from "../http/httpServer";

// Interface Adapter

export default class DashboardController {

    constructor (readonly httpServer: HttpServer, readonly dashboardUseCase: GetDashboardUseCase) {
        httpServer.register("get", "/api/dashboard", async (params: any, body: any) => {
            const output = await dashboardUseCase.execute();
            return output;
        });    
    }
}