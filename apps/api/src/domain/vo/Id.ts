export default class Id {
  private value: number;
  constructor(id: any) {
    if (typeof id === "string") id = Number(id);
    if (!this.isValidItemId(id)) {
      throw new Error("Id inválido!");
    }
    this.value = id;
  }
  private isValidItemId = (id: number) => {
    return Number.isInteger(id) && id > 0;
  };
  getValue() {
    return this.value;
  }
}
