export default class TransactionType {
  private value: "income" | "expense";
  constructor(transactionType: "income" | "expense") {
    if (!this.isValid(transactionType))
      throw new Error("Tipo de transação inválida!");
    this.value = transactionType;
  }
  private isValid = (transactionType: string) => {
    return transactionType === "expense" || transactionType === "income";
  };
  getValue() {
    return this.value;
  }
}
