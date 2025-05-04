export default class Transaction {
  constructor(
    readonly id: number,
    readonly description: string,
    readonly value: number,
    readonly typeTransaction: "expense" | "income",
  ) {
    if (!this.isValidTransactionId(id)) throw new Error("Id inválido!");
    if (!this.isValidValue(value))
      throw new Error("Valor deve ser um número maior que zero!");
    if (!this.isValidTypeTransaction(typeTransaction))
      throw new Error("Tipo de transação inválida!");
    if (!this.isValidDescription(description))
      throw new Error("Descrição deve possuir entre 3 e 50 caracteres!");
  }

  private isValidValue = (value: number) => value > 0;
  private isValidTypeTransaction = (typeTransaction: string) => {
    return typeTransaction === "expense" || typeTransaction === "income";
  };
  private isValidDescription = (description: string | null) => {
    return (
      description !== null &&
      description.length >= 3 &&
      description.length <= 50
    );
  };
  private isValidTransactionId = (transaction_id: number) => {
    return Number.isInteger(transaction_id) && transaction_id > 0;
  };

  static create(
    description: string,
    value: number,
    typeTransaction: "income" | "expense",
  ) {
    const id = Math.floor(Math.random() * 100);
    return new Transaction(id, description, value, typeTransaction);
  }
}
