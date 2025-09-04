import { FakerTransactionRepository } from "../../src/infra/repository/FakerTransactionRepository";
import GetDashboardUsecase from "../../src/application/usecase/GetDashboardUsecase";

describe("GetDashboard", () => {
  it("Should get data from dashboard", async () => {
    const transactionRepository = new FakerTransactionRepository();
    const getDashboardUsecase = new GetDashboardUsecase(transactionRepository);
    const response = await getDashboardUsecase.execute();
    expect(response).toEqual({
      incomes: "205.00",
      expenses: "190.00",
      balance: "15.00",
    });
  });
});
