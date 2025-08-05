import { PrismaTransactionRepository } from "../../src/infra/repository/PrismaTransactionRepository";
import CreateTransactionUsecase from "../../src/application/usercase/CreateTransactionUsecase";
import DeleteTransactionUsecase from "../../src/application/usercase/DeleteTransactionUsecase";

describe("DeleteTransaction", () => {
  const transactionRepository = new PrismaTransactionRepository();
  const createTransactionUsecase = new CreateTransactionUsecase(
    transactionRepository,
  );
  const deleteTransactionUsecase = new DeleteTransactionUsecase(
    transactionRepository,
  );
  it("Should delete transaction in database", async () => {
    const input: any = {
      description: "Teste 03",
      value: 200,
      transactionType: "income",
    };
    const responseCreate = await createTransactionUsecase.execute(input);
    const transactionId = responseCreate.data.id;
    await deleteTransactionUsecase.execute(transactionId);
    await new Promise((resolve) => setTimeout(resolve, 100));
    const responseDelete =
      await transactionRepository.getTransactionById(transactionId);
    expect(responseDelete).toEqual(null);
  });
});
