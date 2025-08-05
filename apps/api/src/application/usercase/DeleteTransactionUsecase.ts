import TransactionRepository from "../repository/TransactionRepository";
import GetTransactionUsecase from "./GetTransactionUsecase";
import Id from "../../domain/vo/Id";

export default class DeleteTransactionUsecase {
  constructor(readonly transactionRepository: TransactionRepository) {}
  async execute(transactionId: any) {
    transactionId = new Id(transactionId).getValue();
    const getItemUsecase = new GetTransactionUsecase(
      this.transactionRepository,
    );
    await getItemUsecase.execute(transactionId);
    await this.transactionRepository.deleteTransaction(transactionId);
    return {
      message: "Transação removida!",
    };
  }
}
