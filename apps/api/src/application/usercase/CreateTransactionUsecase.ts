import Transaction from "../../domain/entidy/Transaction";
import TransactionRepository from "../repository/TransactionRepository";

export default class CreateTransactionUsecase {
  constructor(readonly transactionRepository: TransactionRepository) {}
  async execute(input: any) {
    const transaction = Transaction.create(
      input.description,
      input.value,
      input.transactionType,
    );
    const transactionCreated =
      await this.transactionRepository.createTransaction(transaction);
    return {
      data: transactionCreated,
      message: "Transação criada!",
    };
  }
}
