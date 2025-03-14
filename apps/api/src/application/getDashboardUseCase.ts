import { TransactionRepository } from '../database/transactionRepositoryService';

export class GetDashboardUseCase {
  private readonly transactionRepository: TransactionRepository;
  constructor(transactionRepository: TransactionRepository) {
    this.transactionRepository = transactionRepository;
  }
  async execute() {
    const [sumIncomes, sumExpenses] = await Promise.all([
      this.transactionRepository.calculateSumByTransactionType('income'),
      this.transactionRepository.calculateSumByTransactionType('expense'),
    ]);

    return {
      incomes: sumIncomes.toFixed(2),
      expenses: sumExpenses.toFixed(2),
      balance: (sumIncomes - sumExpenses).toFixed(2),
    };
  }
}
