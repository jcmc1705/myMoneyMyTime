import Transaction from "../../domain/entidy/Transaction";
import TransactionRepository, {
  TransactionInput,
} from "../repository/TransactionRepository";

export default class CreateTransactionUsecase {
  constructor(readonly transactionRepository: TransactionRepository) {}
  async execute({ description, value, transactionType }: TransactionInput) {
    const transaction = Transaction.create(description, value, transactionType);
    const transactionCreated =
      await this.transactionRepository.createTransaction(transaction);
    return {
      data: transactionCreated,
      message: "Transação criada!",
    };
  }
}
