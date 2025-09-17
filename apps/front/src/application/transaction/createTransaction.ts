import { createTransaction } from "../../infra/http/transactionService";
import { Transaction } from "../../domain/transaction";
import { StatusType } from "../../ui/app";

export async function createTransactionUsecase(
  transaction: Transaction,
  setLoading: (value: boolean) => void,
  handleAlert: (message: string, status: StatusType) => void,
  navigate: (to: string) => void,
) {
  setLoading(true);
  const { message } = await createTransaction(transaction);
  handleAlert(message, "success");
  setLoading(false);
  navigate("/transactions");
}
