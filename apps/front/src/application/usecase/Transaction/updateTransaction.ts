import TransactionRepository, {
  TransactionInput,
  TransactionOutput,
} from "../../repository/TransactionRepository";

export class UpdateTransactionUsecase {
  constructor(private repository: TransactionRepository) {}
  async execute(
    transactionId: number,
    input: TransactionInput,
  ): Promise<TransactionOutput> {
    return await this.repository.updateTransaction(transactionId, input);
  }
}
