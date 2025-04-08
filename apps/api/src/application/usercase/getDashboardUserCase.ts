import { TransactionRepository } from '../../infra/repository/transactionRepositoryService';

export class GetDashboardUseCase {
  constructor(readonly transactionRepository: TransactionRepository) { }
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