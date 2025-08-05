import { PrismaTransactionRepository } from "../../src/infra/repository/PrismaTransactionRepository";
import CreateTransactionUsecase from "../../src/application/usercase/CreateTransactionUsecase";
import UpdateTransactionUsecase from "../../src/application/usercase/UpdateTransactionUsecase";

describe("UpdateTransaction", () => {
  const transactionRepository = new PrismaTransactionRepository();
  const createTransactionUsecase = new CreateTransactionUsecase(
    transactionRepository,
  );
  const updateTransactionUsecase = new UpdateTransactionUsecase(
    transactionRepository,
  );

  it("Should update transaction in database", async () => {
    const input: any = {
      description: "Teste 02",
      value: 25,
      transactionType: "income",
    };
    const responseCreate = await createTransactionUsecase.execute(input);
    const transactionId = responseCreate.data.id;
    await updateTransactionUsecase.execute(transactionId, input);
    const responseGet =
      await transactionRepository.getTransactionById(transactionId);
    expect(responseGet?.description).toEqual(input.description);
    expect(responseGet?.value).toEqual(input.value);
    expect(responseGet?.transactionType).toEqual(input.transactionType);
    await transactionRepository.deleteTransaction(transactionId);
  });
});
