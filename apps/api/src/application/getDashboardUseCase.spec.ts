import { TransactionRepositoryFakerDB } from "../database/transactionRepositoryFakerDB"
import { GetDashboardUseCase } from "./getDashboardUseCase"

describe('getDashboardUseCase', () => {
    it('execute should get data from dashboard', async () => {
        const getDashboardUseCase = new GetDashboardUseCase(new TransactionRepositoryFakerDB())
        const response = await getDashboardUseCase.execute()
        expect(response).toEqual({
            incomes: "100.00",
            expenses: "15.00",
            balance: "85.00"
        })
    })
})