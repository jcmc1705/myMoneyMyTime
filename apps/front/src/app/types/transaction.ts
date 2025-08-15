export type TransactionProps = {
  id: number;
  value: number;
  description: string;
  transactionType: string;
  dateTime: Date;
};

export type FormTransactionProps = {
  action: "create" | "edit";
  idParams: string | undefined | null;
  dataForm: {
    description: string;
    value: number | "";
    transactionType: string;
  };
};
