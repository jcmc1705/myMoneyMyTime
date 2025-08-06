import { FakerTransactionRepository } from "../../src/infra/repository/FakerTransactionRepository";
import GetAllTransactionsUsecase from "../../src/application/usecase/GetAllTransactionsUsecase";

describe("GetAllTransactions", () => {
  const transactionRepository = new FakerTransactionRepository();
  const getAllTransactionsUsecase = new GetAllTransactionsUsecase(
    transactionRepository,
  );

  it("Should get all transactions", async () => {
    const response = await getAllTransactionsUsecase.execute();
    expect(response).toEqual([
      {
        description: "Teste FakerDB 01",
        id: 1,
        transactionType: "income",
        value: 100,
        dateTime: new Date("2025-03-03T21:38:24.633Z"),
      },
      {
        description: "Teste FakerDB 02",
        id: 2,
        transactionType: "expense",
        value: 15,
        dateTime: new Date("2025-03-03T21:38:24.633Z"),
      },
    ]);
  });
});
