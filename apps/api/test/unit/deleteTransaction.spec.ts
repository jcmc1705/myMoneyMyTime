import { FakerTransactionRepository } from "../../src/infra/repository/FakerTransactionRepository";
import DeleteTransactionUsecase from "../../src/application/usercase/DeleteTransactionUsecase";

describe("DeleteTransaction", () => {
  const transactionRepository = new FakerTransactionRepository();
  const deleteTransactionUsecase = new DeleteTransactionUsecase(
    transactionRepository,
  );
  it("Should delete transaction", async () => {
    const transactionId = 2;
    const response = await deleteTransactionUsecase.execute(transactionId);
    expect(response.message).toEqual("Transação removida!");
  });
  it('Should throw error "Id inválido"', async () => {
    const transactionId = -1;
    await expect(
      deleteTransactionUsecase.execute(transactionId),
    ).rejects.toThrow("Id inválido!");
  });
});
