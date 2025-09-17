import { Transaction } from "../../domain/transaction";
import { getTransaction } from "../../infra/http/transactionService";

export async function getTransactionUsecase(
  transactionId: number,
  setTransaction: (transaction: Transaction) => void,
  setLoading: (value: boolean) => void,
) {
  setLoading(true);
  const outputGetTransaction = await getTransaction(transactionId);
  setTransaction(outputGetTransaction);
  setLoading(false);
}
