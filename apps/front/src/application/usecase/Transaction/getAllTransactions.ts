import TransactionRepository, {
  GetAllTransactionsOutput,
} from "../../repository/TransactionRepository";

export class GetAllTransactionsUsecase {
  constructor(private repository: TransactionRepository) {}
  async execute(
    page: number,
    limit: number,
  ): Promise<GetAllTransactionsOutput> {
    return await this.repository.getAllTransactions(page, limit);
  }
}
