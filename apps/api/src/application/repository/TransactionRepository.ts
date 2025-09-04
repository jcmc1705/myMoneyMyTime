import Transaction from "../../domain/entidy/Transaction";

export default interface TransactionRepository {
  calculateSumByTransactionType(
    transactionType: "income" | "expense",
  ): Promise<number>;
  getTotalTransactions(): Promise<number>;
  getAllTransactions(
    limit: number,
    offset: number,
  ): Promise<TransactionOutput[]>;
  getTransactionById(transactionId: number): Promise<TransactionOutput | null>;
  createTransaction(input: Transaction): Promise<TransactionOutput>;
  updateTransaction(
    transactionId: number,
    input: Transaction,
  ): Promise<TransactionOutput>;
  deleteTransaction(transactionId: number): Promise<TransactionOutput>;
}

export type TransactionOutput = {
  id: number;
  description: string;
  value: number;
  transactionType: "income" | "expense";
  dateTime: Date;
};
