import { FakerTransactionRepository } from "../../src/infra/repository/FakerTransactionRepository";
import GetDashboardUsecase from "../../src/application/usecase/GetDashboardUsecase";

describe("GetDashboard", () => {
  it("Should get data from dashboard", async () => {
    const transactionRepository = new FakerTransactionRepository();
    const getDashboardUsecase = new GetDashboardUsecase(transactionRepository);
    const response = await getDashboardUsecase.execute();
    expect(response).toEqual({
      incomes: "100.00",
      expenses: "15.00",
      balance: "85.00",
    });
  });
});
