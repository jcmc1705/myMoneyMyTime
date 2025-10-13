import TransactionRepository from "../../repository/TransactionRepository";

export class DeleteTransactionUsecase {
  constructor(private repository: TransactionRepository) {}
  async execute(transactionId: number): Promise<{ message: string }> {
    return await this.repository.deleteTransaction(transactionId);
  }
}
