export default class Description {
  private value: string;
  constructor(description: string) {
    if (!this.isValid(description))
      throw new Error("Descrição deve possuir entre 3 e 50 caracteres!");
    this.value = description;
  }
  private isValid = (description: string) => {
    return (
      description !== null &&
      description.length >= 3 &&
      description.length <= 50
    );
  };
  getValue() {
    return this.value;
  }
}
