export type Transaction = {
  id?: number;
  description: string;
  value: number;
  transactionType: "income" | "expense";
  dateTime?: Date;
};
