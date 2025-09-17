import { Transaction } from "../../domain/transaction";
import { updateTransaction } from "../../infra/http/transactionService";
import { StatusType } from "../../ui/app";

export async function updateTransactionUsecase(
  transactionId: number,
  transaction: Transaction,
  setLoading: (value: boolean) => void,
  handleAlert: (message: string, status: StatusType) => void,
  navigate: (to: string) => void,
) {
  setLoading(true);
  const { message } = await updateTransaction(transactionId, transaction);
  setLoading(false);
  handleAlert(message, "success");
  navigate("/transactions");
}
