import HttpServer from "../http/httpServer";
import CreateItemUsecase from "../../application/usecase/CreateTransactionUsecase";
import GetAllItemsUsecase from "../../application/usecase/GetAllTransactionsUsecase";
import GetTransactionUsecase from "../../application/usecase/GetTransactionUsecase";
import UpdateItemUsecase from "../../application/usecase/UpdateTransactionUsecase";
import DeleteItemUsecase from "../../application/usecase/DeleteTransactionUsecase";
import { TransactionOutput } from "../../application/repository/TransactionRepository";

export type ParamsTransactionType = {
  transactionId: number;
};

export type BodyTransactionTypes = {
  description: string;
  value: number;
  transactionType: "income" | "expense";
};

export type QueryBodyTransactionTypes = {
  page: string;
  limit: string;
};

export default class TransactionsController {
  constructor(
    readonly httpServer: HttpServer,
    readonly createTransaction: CreateItemUsecase,
    readonly getAllTransactions: GetAllItemsUsecase,
    readonly getTransaction: GetTransactionUsecase,
    readonly updateTransaction: UpdateItemUsecase,
    readonly deleteTransaction: DeleteItemUsecase,
  ) {
    httpServer.register<
      { data: TransactionOutput; message: string },
      { body: BodyTransactionTypes }
    >("post", "/api/transactions", async ({ body }) => {
      const output = await createTransaction.execute(body);
      return output;
    });

    httpServer.register<
      { data: TransactionOutput[]; totalPages: number },
      { query: QueryBodyTransactionTypes }
    >("get", "/api/transactions", async ({ query }) => {
      const { page, limit } = query;
      const output = await getAllTransactions.execute(
        Number(page),
        Number(limit),
      );
      return output;
    });

    httpServer.register<
      TransactionOutput,
      { params: { transactionId: string } }
    >("get", "/api/transactions/:transactionId", async ({ params }) => {
      const output = await getTransaction.execute(Number(params.transactionId));
      return output;
    });

    httpServer.register<
      { data: TransactionOutput; message: string },
      { params: { transactionId: string }; body: BodyTransactionTypes }
    >("put", "/api/transactions/:transactionId", async ({ params, body }) => {
      const output = await updateTransaction.execute(
        Number(params.transactionId),
        body,
      );
      return output;
    });

    httpServer.register<
      { message: string },
      { params: { transactionId: string } }
    >("delete", "/api/transactions/:transactionId", async ({ params }) => {
      const output = await deleteTransaction.execute(
        Number(params.transactionId),
      );
      return output;
    });
  }
}
