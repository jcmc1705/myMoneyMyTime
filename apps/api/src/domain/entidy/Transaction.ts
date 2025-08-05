import Description from "../vo/Description";
import Value from "../vo/Value";
import TransactionType from "../vo/TransactionType";

export default class Transaction {
  private description: Description;
  private value: Value;
  private transactionType: TransactionType;
  constructor(description: string, value: number, transactionType: string) {
    this.description = new Description(description);
    this.value = new Value(value);
    this.transactionType = new TransactionType(transactionType);
  }
  static create(description: string, value: number, transactionType: string) {
    return new Transaction(description, value, transactionType);
  }
  getDescription() {
    return this.description.getValue();
  }
  getValue() {
    return this.value.getValue();
  }
  getTransactionType() {
    return this.transactionType.getValue();
  }
}
