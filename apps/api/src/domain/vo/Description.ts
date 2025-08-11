export default class Description {
  private value: string;
  constructor(description: string) {
    const minCharacters = 3;
    const maxCharacters = 50;
    if (!this.isValid(description, minCharacters, maxCharacters))
      throw new Error(
        `Descrição deve possuir entre ${minCharacters} e ${maxCharacters} caracteres!`,
      );
    this.value = description;
  }
  private isValid = (
    description: string,
    minCharacters: number,
    maxCharacters: number,
  ) => {
    return (
      description !== null &&
      description.length >= minCharacters &&
      description.length <= maxCharacters
    );
  };
  getValue() {
    return this.value;
  }
}
