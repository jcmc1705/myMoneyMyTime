export type TransactionType = {
  id: number;
  value: number;
  description: string | null;
  typeTransaction: 'income' | 'expense';
  dateTime: Date | string
};