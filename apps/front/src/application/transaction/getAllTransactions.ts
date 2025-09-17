import { Transaction } from "../../domain/transaction";
import { getAllTransactions } from "../../infra/http/transactionService";

export async function getAllTransactionsUsecase(
  page: number,
  limit: number,
  setLoading: (value: boolean) => void,
  setTransactions: (transaction: Transaction[]) => void,
  setTotalPages: (value: number) => void,
) {
  setLoading(true);
  const { data, totalPages } = await getAllTransactions(page, limit);
  setTransactions(data);
  setTotalPages(totalPages);
  setLoading(false);
}
