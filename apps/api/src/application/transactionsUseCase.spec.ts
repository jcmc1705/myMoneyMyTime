import { TransactionRepositoryFakerDB } from "../database/transactionRepositoryFakerDB"
import { TransactionsUseCase } from "./transactionsUseCase"
import { TransactionType } from "../types/transactionType"

describe('TransactionsUseCase', () => {
  it('getTransactions should get all transactions', async () => {
    const transactionsUseCase = new TransactionsUseCase(new TransactionRepositoryFakerDB())
    const response = await transactionsUseCase.getTransactions()
    expect(response).toEqual([
      {
        description: "Teste FakerDB 01",
        id: 1,
        typeTransaction: "income",
        value: 100,
        dateTime: "2025-03-03T21:38:24.633Z"
      }, {
        description: "Teste FakerDB 02",
        id: 2,
        typeTransaction: "expense",
        value: 15,
        dateTime: "2025-03-03T21:38:24.633Z"
      }
    ])
  })
  it('getTransaction should get transaction by id', async () => {
    const transactionsUseCase = new TransactionsUseCase(new TransactionRepositoryFakerDB())
    const transactionId = 1
    const response = await transactionsUseCase.getTransaction(transactionId)
    expect(response).toEqual(
      {
        description: "Teste FakerDB 01",
        id: 1,
        typeTransaction: "income",
        value: 100,
        dateTime: "2025-03-03T21:38:24.633Z"
      }
    )
  })
  it('getTransaction should throw error "Transação não encontrada!"', async () => {
    const transactionId = 3
    const transactionsUseCase = new TransactionsUseCase(new TransactionRepositoryFakerDB())
    await expect(transactionsUseCase.getTransaction(transactionId)).rejects.toThrow('Transação não encontrada!');
  })
  it('createTransaction should save transaction', async () => {
    const transactionsUseCase = new TransactionsUseCase(new TransactionRepositoryFakerDB())
    const typeTransaction: string = "expense";
    if (typeTransaction === "expense" || typeTransaction === "income") {
      const transaction: TransactionType = {
        description: "Supermercado",
        value: 50,
        typeTransaction: typeTransaction,
        id: 50,
        dateTime: "2025-03-09T12:00:00"
      };
      const response = await transactionsUseCase.createTransaction(transaction)
      expect(response.message).toEqual('Transação criada!')
      expect(response.data.description).toEqual(transaction.description)
      expect(response.data.value).toEqual(transaction.value)
      expect(response.data.typeTransaction).toEqual(transaction.typeTransaction)
    }
  })
  it('createTransaction should throw error "Valor deve ser um número maior que zero!"', async () => {
    const transactionsUseCase = new TransactionsUseCase(new TransactionRepositoryFakerDB())
    const typeTransaction: string = "expense";
    if (typeTransaction === "expense" || typeTransaction === "income") {
      const transaction: TransactionType = {
        description: "Supermercado",
        value: -50,
        typeTransaction: typeTransaction,
        id: 50,
        dateTime: "2025-03-09T12:00:00"
      };
      await expect(transactionsUseCase.createTransaction(transaction)).rejects.toThrow('Valor deve ser um número maior que zero!');
    }
  })
  it('createTransaction should throw error "Descrição deve possuir entre 3 e 50 caracteres!"', async () => {
    const transactionsUseCase = new TransactionsUseCase(new TransactionRepositoryFakerDB())
    const typeTransaction: string = "expense";
    if (typeTransaction === "expense" || typeTransaction === "income") {
      const transaction: TransactionType = {
        description: "",
        value: 50,
        typeTransaction: typeTransaction,
        id: 50,
        dateTime: "2025-03-09T12:00:00"
      };
      await expect(transactionsUseCase.createTransaction(transaction)).rejects.toThrow('Descrição deve possuir entre 3 e 50 caracteres!');
    }
  })
  it('updateTransaction should update transaction', async () => {
    const transactionsUseCase = new TransactionsUseCase(new TransactionRepositoryFakerDB())
    const typeTransaction: string = "expense";
    if (typeTransaction === "expense" || typeTransaction === "income") {
      const transaction: TransactionType = {
        description: "Supermercado",
        value: 50,
        typeTransaction: typeTransaction,
        id: 1,
        dateTime: "2025-03-09T12:00:00"
      };
      const transactionId = 1
      const response = await transactionsUseCase.updateTransaction(transactionId, transaction)
      expect(response.message).toEqual('Transação atualizada!')
      expect(response.data.description).toEqual(transaction.description)
      expect(response.data.value).toEqual(transaction.value)
      expect(response.data.typeTransaction).toEqual(transaction.typeTransaction)
    }
  })
  it('updateTransaction should throw error "Valor deve ser um número maior que zero!"', async () => {
    const transactionsUseCase = new TransactionsUseCase(new TransactionRepositoryFakerDB())
    const typeTransaction: string = "expense";
    if (typeTransaction === "expense" || typeTransaction === "income") {
      const transaction: TransactionType = {
        description: "Supermercado",
        value: -50,
        typeTransaction: typeTransaction,
        id: 50,
        dateTime: "2025-03-09T12:00:00"
      };
      const transactionId = 1
      await expect(transactionsUseCase.updateTransaction(transactionId, transaction)).rejects.toThrow('Valor deve ser um número maior que zero!');
    }
  })
  it('updateTransaction should throw error "Descrição deve possuir entre 3 e 50 caracteres!"', async () => {
    const transactionsUseCase = new TransactionsUseCase(new TransactionRepositoryFakerDB())
    const typeTransaction: string = "expense";
    if (typeTransaction === "expense" || typeTransaction === "income") {
      const transaction: TransactionType = {
        description: "",
        value: 50,
        typeTransaction: typeTransaction,
        id: 50,
        dateTime: "2025-03-09T12:00:00"
      };
      const transactionId = 1
      await expect(transactionsUseCase.updateTransaction(transactionId, transaction)).rejects.toThrow('Descrição deve possuir entre 3 e 50 caracteres!');
    }
  })
  it('updateTransaction should throw error "Id inválido"', async () => {
    const transactionsUseCase = new TransactionsUseCase(new TransactionRepositoryFakerDB())
    const typeTransaction: string = "expense";
    if (typeTransaction === "expense" || typeTransaction === "income") {
      const transaction: TransactionType = {
        description: "",
        value: 50,
        typeTransaction: typeTransaction,
        id: 50,
        dateTime: "2025-03-09T12:00:00"
      };
      const transactionId = -1
      await expect(transactionsUseCase.updateTransaction(transactionId, transaction)).rejects.toThrow('Id inválido!');
    }
  })
  it('deleteTransaction should delete transaction', async () => {
    const transactionsUseCase = new TransactionsUseCase(new TransactionRepositoryFakerDB())
    const transactionId = 2
    const response = await transactionsUseCase.deleteTransaction(transactionId);
    expect(response.message).toEqual('Transação excluída!')
  })
  it('deleteTransaction should throw error "Id inválido"', async () => {
    const transactionsUseCase = new TransactionsUseCase(new TransactionRepositoryFakerDB())
    const transactionId = -1
    await expect(transactionsUseCase.deleteTransaction(transactionId)).rejects.toThrow('Id inválido!');
  })
})