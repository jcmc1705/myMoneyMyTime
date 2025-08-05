import TransactionRepository from "../repository/TransactionRepository";

export default class GetAllTransactionsUsecase {
  constructor(readonly transactionRepository: TransactionRepository) {}
  async execute() {
    return await this.transactionRepository.getAllTransactions();
  }
}
