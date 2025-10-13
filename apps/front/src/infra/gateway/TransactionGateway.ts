import HttpClient from "../http/HttpClient";
import { Transaction } from "../../domain/Transaction";
import TransactionRepository, {
  GetAllTransactionsOutput,
  TransactionInput,
  TransactionOutput,
} from "../../application/repository/TransactionRepository";

export class TransactionGatewayHttp implements TransactionRepository {
  constructor(private httpClient: HttpClient) {}

  async createTransaction(input: TransactionInput): Promise<TransactionOutput> {
    return await this.httpClient.post<TransactionInput, TransactionOutput>(
      "/transactions",
      input,
    );
  }

  async getAllTransactions(page: number, limit: number) {
    return await this.httpClient.get<GetAllTransactionsOutput>(
      `/transactions?page=${page}&limit=${limit}`,
    );
  }

  async getTransaction(transactionId: number): Promise<Transaction> {
    return await this.httpClient.get<Transaction>(
      `/transactions/${transactionId}`,
    );
  }

  async updateTransaction(
    transactionId: number,
    input: TransactionInput,
  ): Promise<TransactionOutput> {
    return await this.httpClient.put<TransactionInput, TransactionOutput>(
      `/transactions/${transactionId}`,
      input,
    );
  }

  async deleteTransaction(transactionId: number): Promise<{ message: string }> {
    return await this.httpClient.delete<{ message: string }>(
      `/transactions/${transactionId}`,
    );
  }
}
