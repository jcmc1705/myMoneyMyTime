import { apiClient } from "./apiClient";
import { Transaction } from "../../domain/transaction";

export async function getAllTransactions(page: number, limit: number) {
  return apiClient<{ data: Transaction[]; totalPages: number }>(
    `/transactions?page=${page}&limit=${limit}`,
  );
}

export async function createTransaction(transaction: Transaction) {
  return apiClient<{ data: Transaction; message: string }>("/transactions", {
    method: "POST",
    body: JSON.stringify(transaction),
  });
}

export async function getTransaction(transactionId: number) {
  return apiClient<Transaction>(`/transactions/${transactionId}`);
}

export async function deleteTransaction(transactionId: number) {
  return apiClient<{ message: string }>(`/transactions/${transactionId}`, {
    method: "DELETE",
  });
}

export async function updateTransaction(
  transactionId: number,
  transaction: Transaction,
) {
  return apiClient<{ data: Transaction; message: string }>(
    `/transactions/${transactionId}`,
    {
      method: "PUT",
      body: JSON.stringify(transaction),
    },
  );
}
