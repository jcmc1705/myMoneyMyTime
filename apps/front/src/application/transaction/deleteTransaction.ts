import { deleteTransaction } from "../../infra/http/transactionService";
import { StatusType } from "../../ui/app";

export async function deleteTransactionUsecase(
  transactionId: number,
  setLoading: (value: boolean) => void,
  handleAlert: (message: string, status: StatusType) => void,
) {
  setLoading(true);
  const { message } = await deleteTransaction(transactionId);
  handleAlert(message, "success");
}
