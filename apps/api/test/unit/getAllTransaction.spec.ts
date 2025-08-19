import { FakerTransactionRepository } from "../../src/infra/repository/FakerTransactionRepository";
import GetAllTransactionsUsecase from "../../src/application/usecase/GetAllTransactionsUsecase";

describe("GetAllTransactions", () => {
  const transactionRepository = new FakerTransactionRepository();
  const getAllTransactionsUsecase = new GetAllTransactionsUsecase(
    transactionRepository,
  );

  it("Should get all transactions from the first page", async () => {
    const response = await getAllTransactionsUsecase.execute({
      page: 1,
      limit: 5,
    });
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
    const response = await getAllTransactionsUsecase.execute({
      page: 2,
      limit: 5,
    });
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
    const response = await getAllTransactionsUsecase.execute({
      page: 2,
      limit: 5,
    });
    expect(response.totalPages).toEqual(2);
  });
});
