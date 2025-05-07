import { FakerTransactionRepository } from "../../src/infra/repository/FakerTransactionRepository";
import { GetDashboardUseCase } from "../../src/application/usercase/getDashboardUserCase";

describe("getDashboardUseCase", () => {
  it("execute should get data from dashboard", async () => {
    const getDashboardUseCase = new GetDashboardUseCase(
      new FakerTransactionRepository(),
    );
    const response = await getDashboardUseCase.execute();
    expect(response).toEqual({
      incomes: "100.00",
      expenses: "15.00",
      balance: "85.00",
    });
  });
});
