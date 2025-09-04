export type TransactionProps = {
  id?: number;
  value: number;
  description: string;
  transactionType: string;
  dateTime?: Date;
};

export type FormTransactionProps = {
  action: (transaction: TransactionProps) => void;
  dataForm?: {
    description: string;
    value: number | "";
    transactionType: string;
  };
};
