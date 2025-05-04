export type TransactionType = {
  id: number;
  value: number;
  description: string | null;
  typeTransaction: "income" | "expense";
  dateTime: Date | string;
};

export type InputTransactionTypes = {
  description: string;
  value: number;
  typeTransaction: "income" | "expense";
};
