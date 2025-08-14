import HttpServer from "../http/httpServer";
import CreateItemUsecase from "../../application/usecase/CreateTransactionUsecase";
import GetAllItemsUsecase from "../../application/usecase/GetAllTransactionsUsecase";
import GetTransactionUsecase from "../../application/usecase/GetTransactionUsecase";
import UpdateItemUsecase from "../../application/usecase/UpdateTransactionUsecase";
import DeleteItemUsecase from "../../application/usecase/DeleteTransactionUsecase";

export default class TransactionsController {
  constructor(
    readonly httpServer: HttpServer,
    readonly createTransaction: CreateItemUsecase,
    readonly getAllTransactions: GetAllItemsUsecase,
    readonly getTransaction: GetTransactionUsecase,
    readonly updateTransaction: UpdateItemUsecase,
    readonly deleteTransaction: DeleteItemUsecase,
  ) {
    httpServer.register(
      "post",
      "/api/transactions",
      async (params: any, body: any) => {
        const output = await createTransaction.execute(body);
        return output;
      },
    );

    httpServer.register(
      "get",
      "/api/transactions",
      async (params: any, body: any) => {
        const output = await getAllTransactions.execute();
        return output;
      },
    );

    httpServer.register(
      "get",
      "/api/transactions/:transactionId",
      async (params: any, body: any) => {
        const output = await getTransaction.execute(params.transactionId);
        return output;
      },
    );

    httpServer.register(
      "put",
      "/api/transactions/:transactionId",
      async (params: any, body: any) => {
        const output = await updateTransaction.execute(
          params.transactionId,
          body,
        );
        return output;
      },
    );

    httpServer.register(
      "delete",
      "/api/transactions/:transactionId",
      async (params: any, body: any) => {
        const output = await deleteTransaction.execute(params.transactionId);
        return output;
      },
    );
  }
}
