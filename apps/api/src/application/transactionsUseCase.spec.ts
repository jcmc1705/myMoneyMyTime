import { TransactionRepositoryFakerDB } from "../database/transactionRepositoryFakerDB"
import { TransactionsUseCase } from "./transactionsUseCase"

describe('TransactionsUseCase', () => {
  it('getTransaction deve trazer todas as transações', async () => {
    const transactionsUseCase = new TransactionsUseCase(new TransactionRepositoryFakerDB())
    const response = await transactionsUseCase.getTransactions()
    expect(response).toEqual([
      {
        description: "Teste FakerDB 01",
        id: 1,
        typeTransaction: "income",
        value: 100,
        dateTime: ""
      }, {
        description: "Teste FakerDB 02",
        id: 2,
        typeTransaction: "expense",
        value: 15,
        dateTime: ""
      }
    ])
  })
})