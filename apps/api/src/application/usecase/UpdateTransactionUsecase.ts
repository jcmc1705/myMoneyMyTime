import TransactionRepository from "../repository/TransactionRepository";
import GetTransactionUsecase from "./GetTransactionUsecase";
import Transaction from "../../domain/entidy/Transaction";
import Id from "../../domain/vo/Id";

export default class UpdateTransactionUsecase {
  constructor(readonly transactionRepository: TransactionRepository) {}
  async execute(transactionId: any, input: any) {
    transactionId = new Id(transactionId).getValue();
    const getTransactionUsecase = new GetTransactionUsecase(
      this.transactionRepository,
    );
    await getTransactionUsecase.execute(transactionId);
    const transaction = Transaction.create(
      input.description,
      input.value,
      input.transactionType,
    );
    const transactionUpdated =
      await this.transactionRepository.updateTransaction(
        transactionId,
        transaction,
      );
    return {
      data: transactionUpdated,
      message: "Transação atualizada!",
    };
  }
}
