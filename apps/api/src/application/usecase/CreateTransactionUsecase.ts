import Transaction from "../../domain/entidy/Transaction";
import { BodyTransactionTypes } from "../../infra/controller/TransactionsController";
import TransactionRepository from "../repository/TransactionRepository";

export default class CreateTransactionUsecase {
  constructor(readonly transactionRepository: TransactionRepository) {}
  async execute({ description, value, transactionType }: BodyTransactionTypes) {
    const transaction = Transaction.create(description, value, transactionType);
    const transactionCreated =
      await this.transactionRepository.createTransaction(transaction);
    return {
      data: transactionCreated,
      message: "Transação criada!",
    };
  }
}
