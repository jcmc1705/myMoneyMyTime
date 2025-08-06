import TransactionRepository from "../repository/TransactionRepository";
import Id from "../../domain/vo/Id";

export default class GetTransactionUsecase {
  constructor(readonly transactionRepository: TransactionRepository) {}
  async execute(transactionId: any) {
    transactionId = new Id(transactionId).getValue();
    const transaction =
      await this.transactionRepository.getTransactionById(transactionId);
    if (!transaction) throw new Error("Transação não encontrada!");
    return transaction;
  }
}
