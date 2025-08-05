import { FakerTransactionRepository } from "../../src/infra/repository/FakerTransactionRepository";
import UpdateTransactionUsecase from "../../src/application/usercase/UpdateTransactionUsecase";

describe("UpdateTransaction", () => {
  const transactionRepository = new FakerTransactionRepository();
  const updateTransactionUsecase = new UpdateTransactionUsecase(
    transactionRepository,
  );

  it("Should update transaction", async () => {
    const transaction: any = {
      description: "Supermercado",
      value: 50,
      transactionType: "expense",
    };
    const transactionId = 1;
    const response = await updateTransactionUsecase.execute(
      transactionId,
      transaction,
    );
    expect(response.message).toEqual("Transação atualizada!");
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
    const transactionId = 1;
    await expect(
      updateTransactionUsecase.execute(transactionId, transaction),
    ).rejects.toThrow("Valor deve ser um número maior que zero!");
  });
  it('Should throw error "Descrição deve possuir entre 3 e 50 caracteres!"', async () => {
    const transactionId = 1;
    const transaction: any = {
      description: "",
      value: 50,
      transactionType: "expense",
    };
    await expect(
      updateTransactionUsecase.execute(transactionId, transaction),
    ).rejects.toThrow("Descrição deve possuir entre 3 e 50 caracteres!");
  });
  it('Should throw error "Id inválido"', async () => {
    const transactionId = -1;
    const transaction: any = {
      description: "",
      value: 50,
      transactionType: "expense",
    };
    await expect(
      updateTransactionUsecase.execute(transactionId, transaction),
    ).rejects.toThrow("Id inválido!");
  });
});
