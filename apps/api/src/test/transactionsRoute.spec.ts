import axios from "axios"
import { AdapterPrisma } from '../infra/database/AdapterPrisma'
import { TransactionType } from "../types/transactionType"

axios.defaults.validateStatus = () => true
const baseUrl = "http:localhost:3000/api"

describe('transactionsRoute', () => {
    it('post "/transactions" should create transaction', async () => {
        const input = {
            description: "Teste 01",
            value: 100,
            typeTransaction: 'income'
        }
        const outputPostTransaction = await axios.post(`${baseUrl}/transactions`, input)
        expect(outputPostTransaction.status).toBe(200)
        const transactionId = outputPostTransaction.data.data.id
        const outputGetTransaction = await axios.get(`${baseUrl}/transactions/${transactionId}`)
        expect(outputGetTransaction.data.id).toBeDefined()
        expect(outputGetTransaction.data.description).toEqual(input.description)
        expect(outputGetTransaction.data.value).toEqual(input.value)
        expect(outputGetTransaction.data.typeTransaction).toEqual(input.typeTransaction)
        const transactionRepositoryPrisma = new AdapterPrisma()
        await transactionRepositoryPrisma.deleteTransaction(transactionId)
    })

    it('post "/transactions" should throw error "Valor deve ser um número maior que zero!"', async () => {
        const input = {
            description: "Teste 01",
            value: -5,
            typeTransaction: 'income'
        }
        const outputPostTransaction = await axios.post(`${baseUrl}/transactions`, input)
        expect(outputPostTransaction.status).toBe(422)
        expect(outputPostTransaction.data.message).toEqual('Valor deve ser um número maior que zero!')
    })

    it('get "/transactions" should get all transactions', async () => {
        const outputGetTransactions = await axios.get(`${baseUrl}/transactions`)
        expect(outputGetTransactions.status).toEqual(200)
        outputGetTransactions.data.forEach((transaction: TransactionType) => {
            expect(transaction).toHaveProperty("id")
            expect(transaction).toHaveProperty("description")
            expect(transaction).toHaveProperty("value")
            expect(transaction).toHaveProperty("dateTime")
            expect(transaction).toHaveProperty("typeTransaction")
        });
    })

    it('get "/transactions/:id" should get transaction by id', async () => {
        const transactionId = 16
        const outputGetTransaction = await axios.get(`${baseUrl}/transactions/${transactionId}`)
        expect(outputGetTransaction.status).toEqual(200)
        const transaction = outputGetTransaction.data
        expect(transaction).toHaveProperty("id")
        expect(transaction).toHaveProperty("description")
        expect(transaction).toHaveProperty("value")
        expect(transaction).toHaveProperty("dateTime")
        expect(transaction).toHaveProperty("typeTransaction")
    });

    it('get "/transactions/:id" should throw error "Transação não encontrada!"', async () => {
        const transactionId = 100
        const outputGetTransaction = await axios.get(`${baseUrl}/transactions/${transactionId}`)
        expect(outputGetTransaction.status).toEqual(422)
        expect(outputGetTransaction.data.message).toEqual('Transação não encontrada!')
    });

    it('put "/transactions/:id" should update transaction', async () => {
        const inputCreate = {
            description: "Teste 02",
            value: 50,
            typeTransaction: 'expense',
        }
        const transactionRepositoryPrisma = new AdapterPrisma()
        const transactionCreated = await transactionRepositoryPrisma.createTransaction(inputCreate)
        const transactionId = transactionCreated.id
        const inputUpdate = {
            description: "Teste update",
            value: 75,
            typeTransaction: 'expense',
        }
        const outputPutTransaction = await axios.put(`${baseUrl}/transactions/${transactionId}`, inputUpdate)
        expect(outputPutTransaction.status).toBe(200)
        const outputGetTransaction = await axios.get(`${baseUrl}/transactions/${transactionId}`)
        expect(outputGetTransaction.data.id).toEqual(transactionId)
        expect(outputGetTransaction.data.description).toEqual(inputUpdate.description)
        expect(outputGetTransaction.data.value).toEqual(inputUpdate.value)
        expect(outputGetTransaction.data.typeTransaction).toEqual(inputUpdate.typeTransaction)
        await transactionRepositoryPrisma.deleteTransaction(transactionId)
    })

    it('put "/transactions/:id" should throw error "Tipo de transação inválida!"', async () => {
        const input = {
            description: "Teste 03",
            value: 5,
            typeTransaction: 'teste'
        }
        const transactionId = 16
        const outputPutTransaction = await axios.put(`${baseUrl}/transactions/${transactionId}`, input)
        expect(outputPutTransaction.status).toBe(422)
        expect(outputPutTransaction.data.message).toEqual('Tipo de transação inválida!')
    })

    it('delete "/transactions/:id" should delete transaction', async () => {
        const inputCreate = {
            description: "Teste 04",
            value: 20,
            typeTransaction: 'income',
        }
        const transactionRepositoryPrisma = new AdapterPrisma()
        const transactionCreated = await transactionRepositoryPrisma.createTransaction(inputCreate)
        const transactionId = transactionCreated.id
        const outputDeleteTransaction = await axios.delete(`${baseUrl}/transactions/${transactionId}`)
        expect(outputDeleteTransaction.status).toEqual(200)
        expect(outputDeleteTransaction.data.message).toEqual('Transação excluída!')
        await new Promise(resolve => setTimeout(resolve, 100));
        const outputGetTransaction = await axios.get(`${baseUrl}/transactions/${transactionId}`)
        expect(outputGetTransaction.data.message).toEqual('Transação não encontrada!')
    })

    it('delete "/transactions/:id" should throw error "Transação não encontrada!" ', async () => {
        const transactionId = 100
        const outputDeleteTransaction = await axios.delete(`${baseUrl}/transactions/${transactionId}`)
        expect(outputDeleteTransaction.status).toEqual(422)
        expect(outputDeleteTransaction.data.message).toEqual('Transação não encontrada!')
    })
})