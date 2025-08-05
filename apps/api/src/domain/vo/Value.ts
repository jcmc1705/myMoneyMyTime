export default class Value {
  private value: number;
  constructor(value: number) {
    if (!this.isValid(value))
      throw new Error("Valor deve ser um número maior que zero!");
    this.value = value;
  }
  private isValid = (value: number) => value > 0;
  getValue() {
    return this.value;
  }
}
