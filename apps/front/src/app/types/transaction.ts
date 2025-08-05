export type TransactionProps = {
  value: number | "";
  description: string;
  transactionType: "income" | "expense";
};

export type FormTransactionProps = {
  action: "create" | "edit";
  idParams: string | undefined | null;
  dataForm: TransactionProps;
};
