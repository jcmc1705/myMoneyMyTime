export type TransactionType = {
    value: number;
    description: string | null;
    typeTransaction: 'income' | 'expense';
  };

  export type TransactionTypeDB = {
    id: number
    value: number;
    description: string | null;
    typeTransaction: 'income' | 'expense';
    dateTime: Date | string
  };