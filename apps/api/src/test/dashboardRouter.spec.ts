import axios from "axios"

axios.defaults.validateStatus = () => true
const baseUrl = "http:localhost:3000/api"

describe('transactionsRoute', () => {
    it('get "/dashboard" should get dashboard data', async () => {
        const outputGetTransactions = await axios.get(`${baseUrl}/dashboard`)
        expect(outputGetTransactions.status).toEqual(200)
        expect(outputGetTransactions.data).toHaveProperty('incomes')
        expect(outputGetTransactions.data).toHaveProperty('expenses')
        expect(outputGetTransactions.data).toHaveProperty('balance')
    })
})