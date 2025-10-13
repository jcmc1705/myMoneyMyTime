import TransactionRepository, {
  TransactionInput,
  TransactionOutput,
} from "../../repository/TransactionRepository";

export class CreateTransactionUsecase {
  constructor(private repository: TransactionRepository) {}
  async execute(input: TransactionInput): Promise<TransactionOutput> {
    return await this.repository.createTransaction(input);
  }
}
