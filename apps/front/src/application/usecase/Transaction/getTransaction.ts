import TransactionRepository from "../../repository/TransactionRepository";
import { Transaction } from "../../../domain/Transaction";

export class GetTransactionUsecase {
  constructor(private repository: TransactionRepository) {}
  async execute(transactionId: number): Promise<Transaction> {
    return await this.repository.getTransaction(transactionId);
  }
}
