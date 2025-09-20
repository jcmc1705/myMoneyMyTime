import { Transaction } from "../../domain/Transaction";

export default interface TransactionRepository {
  createTransaction(input: TransactionInput): Promise<TransactionOutput>;
  getAllTransactions(
    page: number,
    limit: number,
  ): Promise<GetAllTransactionsOutput>;
  getTransaction(transactionId: number): Promise<Transaction>;
  updateTransaction(
    transactionId: number,
    input: TransactionInput,
  ): Promise<TransactionOutput>;
  deleteTransaction(transactionId: number): Promise<{ message: string }>;
}

export type TransactionInput = {
  description: string;
  value: number;
  transactionType: "income" | "expense";
};

export type TransactionOutput = {
  data: Transaction;
  message: string;
};

export type GetAllTransactionsOutput = {
  data: Transaction[];
  totalPages: number;
};
