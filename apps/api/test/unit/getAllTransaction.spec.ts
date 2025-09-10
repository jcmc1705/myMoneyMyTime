import { FakerTransactionRepository } from "../../src/infra/repository/FakerTransactionRepository";
import GetAllTransactionsUsecase from "../../src/application/usecase/GetAllTransactionsUsecase";

describe("GetAllTransactions", () => {
  const transactionRepository = new FakerTransactionRepository();
  const getAllTransactionsUsecase = new GetAllTransactionsUsecase(
    transactionRepository,
  );

  it("Should get all transactions from the first page", async () => {
    const page = 1;
    const limit = 5;
    const response = await getAllTransactionsUsecase.execute(page, limit);
    expect(response.data).toEqual([
      {
        id: 6,
        transactionType: "income",
        value: 5,
        description: "Teste FakerDB 06",
        dateTime: new Date("2025-03-03T21:38:24.633Z"),
      },
      {
        id: 5,
        transactionType: "expense",
        value: 25,
        description: "Teste FakerDB 05",
        dateTime: new Date("2025-03-03T21:38:24.633Z"),
      },
      {
        id: 4,
        transactionType: "expense",
        value: 150,
        description: "Teste FakerDB 04",
        dateTime: new Date("2025-03-03T21:38:24.633Z"),
      },
      {
        id: 3,
        transactionType: "income",
        value: 100,
        description: "Teste FakerDB 03",
        dateTime: new Date("2025-03-03T21:38:24.633Z"),
      },
      {
        id: 2,
        transactionType: "expense",
        value: 15,
        description: "Teste FakerDB 02",
        dateTime: new Date("2025-03-03T21:38:24.633Z"),
      },
    ]);
  });

  it("Should get all transactions from the second page", async () => {
    const page = 2;
    const limit = 5;
    const response = await getAllTransactionsUsecase.execute(page, limit);
    expect(response.data).toEqual([
      {
        id: 1,
        transactionType: "income",
        value: 100,
        description: "Teste FakerDB 01",
        dateTime: new Date("2025-03-03T21:38:24.633Z"),
      },
    ]);
  });
  it("Should get total pages", async () => {
    const page = 2;
    const limit = 5;
    const response = await getAllTransactionsUsecase.execute(page, limit);
    expect(response.totalPages).toEqual(2);
  });
});
