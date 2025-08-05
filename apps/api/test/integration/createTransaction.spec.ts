import { PrismaTransactionRepository } from "../../src/infra/repository/PrismaTransactionRepository";
import CreateTransactionUsecase from "../../src/application/usercase/CreateTransactionUsecase";

describe("CreateTransaction", () => {
  const transactionRepository = new PrismaTransactionRepository();
  const createTransactionUsecase = new CreateTransactionUsecase(
    transactionRepository,
  );
  it("Should save transaction in database", async () => {
    const input: any = {
      description: "Teste 01",
      value: 50,
      transactionType: "expense",
    };
    const responseCreate = await createTransactionUsecase.execute(input);
    const transactionId = responseCreate.data.id;
    const responseGet =
      await transactionRepository.getTransactionById(transactionId);
    expect(responseGet?.description).toEqual(input.description);
    expect(responseGet?.value).toEqual(input.value);
    expect(responseGet?.transactionType).toEqual(input.transactionType);
    await transactionRepository.deleteTransaction(transactionId);
  });
});
