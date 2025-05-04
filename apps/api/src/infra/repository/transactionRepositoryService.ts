import {
  InputTransactionTypes,
  TransactionType,
} from "../../types/transactionType";

export interface TransactionRepository {
  calculateSumByTransactionType(
    typeTransaction: "income" | "expense",
  ): Promise<number>;
  getAllTransactions(): Promise<TransactionType[]>;
  getTransactionById(transaction_id: number): Promise<TransactionType | null>;
  createTransaction(input: InputTransactionTypes): Promise<TransactionType>;
  updateTransaction(
    transaction_id: number,
    input: InputTransactionTypes,
  ): Promise<TransactionType>;
  deleteTransaction(transaction_id: number): void;
}
