import { FakerTransactionRepository } from "../../src/infra/repository/FakerTransactionRepository";
import GetTransactionUsecase from "../../src/application/usecase/GetTransactionUsecase";

describe("GetTransaction", () => {
  const transactionRepository = new FakerTransactionRepository();
  const getTransactionUsecase = new GetTransactionUsecase(
    transactionRepository,
  );

  it("Should get transaction by id", async () => {
    const transactionId = 1;
    const response = await getTransactionUsecase.execute(transactionId);
    expect(response).toEqual({
      description: "Teste FakerDB 01",
      id: 1,
      transactionType: "income",
      value: 100,
      dateTime: new Date("2025-03-03T21:38:24.633Z"),
    });
  });
  it('Should throw error "Transação não encontrada!"', async () => {
    const transactionId = 3;
    await expect(getTransactionUsecase.execute(transactionId)).rejects.toThrow(
      "Transação não encontrada!",
    );
  });
});
