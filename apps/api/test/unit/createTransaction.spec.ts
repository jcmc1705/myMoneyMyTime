import { FakerTransactionRepository } from "../../src/infra/repository/FakerTransactionRepository";
import CreateTransactionUsecase from "../../src/application/usercase/CreateTransactionUsecase";

describe("CreateTransaction", () => {
  const transactionRepository = new FakerTransactionRepository();
  const createTransactionUsecase = new CreateTransactionUsecase(
    transactionRepository,
  );
  it("Should save transaction", async () => {
    const transaction: any = {
      description: "Supermercado",
      value: 50,
      transactionType: "expense",
    };
    const response = await createTransactionUsecase.execute(transaction);
    expect(response.message).toEqual("Transação criada!");
    expect(response.data.description).toEqual(transaction.description);
    expect(response.data.value).toEqual(transaction.value);
    expect(response.data.transactionType).toEqual(transaction.transactionType);
  });

  it('Should throw error "Valor deve ser um número maior que zero!"', async () => {
    const transaction: any = {
      description: "Supermercado",
      value: -50,
      transactionType: "expense",
    };
    await expect(createTransactionUsecase.execute(transaction)).rejects.toThrow(
      "Valor deve ser um número maior que zero!",
    );
  });
  it('Should throw error "Descrição deve possuir entre 3 e 50 caracteres!"', async () => {
    const transaction: any = {
      description: "",
      value: 50,
      transactionType: "expense",
    };
    await expect(createTransactionUsecase.execute(transaction)).rejects.toThrow(
      "Descrição deve possuir entre 3 e 50 caracteres!",
    );
  });
});
