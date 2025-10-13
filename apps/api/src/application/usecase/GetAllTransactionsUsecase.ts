import TransactionRepository from "../repository/TransactionRepository";

export default class GetAllTransactionsUsecase {
  constructor(readonly transactionRepository: TransactionRepository) {}
  async execute(page: number, limit: number) {
    const offset = (page - 1) * limit;
    const data = await this.transactionRepository.getAllTransactions(
      limit,
      offset,
    );
    const totalTransactions =
      await this.transactionRepository.getTotalTransactions();
    const totalPages = Math.ceil(totalTransactions / limit);
    return {
      data,
      totalPages,
    };
  }
}
