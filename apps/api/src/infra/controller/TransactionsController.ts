import { TransactionsUseCase } from "../../application/usercase/transactionsUserCase";
import HttpServer from "../http/httpServer";

// Interface Adapter

export default class TransactionsController {

    constructor (readonly httpServer: HttpServer, readonly transactionsUseCase: TransactionsUseCase) {
        httpServer.register("post", "/api/transactions", async (params: any, body: any) => {
            const output = await transactionsUseCase.createTransaction(body);
            return output;
        });
        
        httpServer.register("get", "/api/transactions", async (params: any, body: any) => {
            const output = await transactionsUseCase.getTransactions();
            return output;
        });

        httpServer.register("get", "/api/transactions/:id", async (params: any, body: any) => {
            const output = await transactionsUseCase.getTransaction(Number(params.id));
            return output;
        });
        
        httpServer.register("put", "/api/transactions/:id", async (params: any, body: any) => {
            const output = await transactionsUseCase.updateTransaction(Number(params.id), body);
            return output;
        });

        httpServer.register("delete", "/api/transactions/:id", async (params: any, body: any) => {
            const output = await transactionsUseCase.deleteTransaction(Number(params.id));
            return output;
        });
    }
}
