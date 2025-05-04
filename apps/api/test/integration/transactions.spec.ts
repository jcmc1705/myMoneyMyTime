import { TransactionsUseCase } from "../../src/application/usercase/transactionsUserCase"
import { AdapterPrisma } from "../../src/infra/database/AdapterPrisma"
import { InputTransactionTypes } from "../../src/types/transactionType"

describe('Transactions', () => {

  const adapterPrisma = new AdapterPrisma()
  const transactionsUseCase = new TransactionsUseCase(adapterPrisma)

  it('Should save transaction in database', async () => {
    const input: InputTransactionTypes = {
      description: "Teste 01",
      value: 50,
      typeTransaction: "expense",
    };
    const responseCreate = await transactionsUseCase.createTransaction(input)
    const transactionId = responseCreate.data.id
    const responseGet = await adapterPrisma.getTransactionById(transactionId)
    expect(responseGet?.description).toEqual(input.description)
    expect(responseGet?.value).toEqual(input.value)
    expect(responseGet?.typeTransaction).toEqual(input.typeTransaction)
    await adapterPrisma.deleteTransaction(transactionId)
  })
  it('Should update transaction in database', async () => {
    const input: InputTransactionTypes = {
      description: "Teste 02",
      value: 25,
      typeTransaction: "income",
    }
    const responseCreate = await transactionsUseCase.createTransaction(input)
    const transactionId = responseCreate.data.id
    await transactionsUseCase.updateTransaction(transactionId, input)
    const responseGet = await adapterPrisma.getTransactionById(transactionId)
    expect(responseGet?.description).toEqual(input.description)
    expect(responseGet?.value).toEqual(input.value)
    expect(responseGet?.typeTransaction).toEqual(input.typeTransaction)
    await adapterPrisma.deleteTransaction(transactionId)
  })
  it('Should delete transaction in database', async () => {
    const input: InputTransactionTypes = {
      description: "Teste 03",
      value: 200,
      typeTransaction: "income",
    }
    const responseCreate = await transactionsUseCase.createTransaction(input)
    const transactionId = responseCreate.data.id
    await transactionsUseCase.deleteTransaction(transactionId)
    await new Promise(resolve => setTimeout(resolve, 100));
    const responseDelete = await adapterPrisma.getTransactionById(transactionId)
    expect(responseDelete).toEqual(null)
  })
})
