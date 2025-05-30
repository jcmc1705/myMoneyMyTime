import { TransactionsUseCase } from "../../src/application/usercase/transactionsUserCase";
import { PrismaTransactionRepository } from "../../src/infra/repository/PrismaTransactionRepository";
import { InputTransactionTypes } from "../../src/types/transactionType";

describe("Transactions", () => {
  const prismaTransactionRepository = new PrismaTransactionRepository();
  const transactionsUseCase = new TransactionsUseCase(
    prismaTransactionRepository,
  );

  it("Should save transaction in database", async () => {
    const input: InputTransactionTypes = {
      description: "Teste 01",
      value: 50,
      typeTransaction: "expense",
    };
    const responseCreate = await transactionsUseCase.createTransaction(input);
    const transactionId = responseCreate.data.id;
    const responseGet =
      await prismaTransactionRepository.getTransactionById(transactionId);
    expect(responseGet?.description).toEqual(input.description);
    expect(responseGet?.value).toEqual(input.value);
    expect(responseGet?.typeTransaction).toEqual(input.typeTransaction);
    await prismaTransactionRepository.deleteTransaction(transactionId);
  });
  it("Should update transaction in database", async () => {
    const input: InputTransactionTypes = {
      description: "Teste 02",
      value: 25,
      typeTransaction: "income",
    };
    const responseCreate = await transactionsUseCase.createTransaction(input);
    const transactionId = responseCreate.data.id;
    await transactionsUseCase.updateTransaction(transactionId, input);
    const responseGet =
      await prismaTransactionRepository.getTransactionById(transactionId);
    expect(responseGet?.description).toEqual(input.description);
    expect(responseGet?.value).toEqual(input.value);
    expect(responseGet?.typeTransaction).toEqual(input.typeTransaction);
    await prismaTransactionRepository.deleteTransaction(transactionId);
  });
  it("Should delete transaction in database", async () => {
    const input: InputTransactionTypes = {
      description: "Teste 03",
      value: 200,
      typeTransaction: "income",
    };
    const responseCreate = await transactionsUseCase.createTransaction(input);
    const transactionId = responseCreate.data.id;
    await transactionsUseCase.deleteTransaction(transactionId);
    await new Promise((resolve) => setTimeout(resolve, 100));
    const responseDelete =
      await prismaTransactionRepository.getTransactionById(transactionId);
    expect(responseDelete).toEqual(null);
  });
});
