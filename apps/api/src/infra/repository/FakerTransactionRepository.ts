import {
  InputTransactionTypes,
  TransactionType,
} from "../../types/transactionType";
import { TransactionRepository } from "../../application/repository/TransactionRepository";

export class FakerTransactionRepository implements TransactionRepository {
  database: TransactionType[] = [
    {
      id: 1,
      typeTransaction: "income",
      value: 100,
      description: "Teste FakerDB 01",
      dateTime: "2025-03-03T21:38:24.633Z",
    },
    {
      id: 2,
      typeTransaction: "expense",
      value: 15,
      description: "Teste FakerDB 02",
      dateTime: "2025-03-03T21:38:24.633Z",
    },
  ];

  async calculateSumByTransactionType(typeTransaction: "income" | "expense") {
    let sum = 0;
    this.database.forEach((data) => {
      if (data.typeTransaction === typeTransaction) {
        sum = sum + data.value;
      }
    });
    return sum;
  }

  async getAllTransactions() {
    return this.database;
  }

  async getTransactionById(transaction_id: number) {
    const transaction = this.database.filter(
      (data) => data.id === transaction_id,
    );
    return transaction[0];
  }

  async createTransaction(input: InputTransactionTypes) {
    this.database.push({
      ...input,
      dateTime: this.getDateTime(),
      id: Math.floor(Math.random() * 100),
    });
    return this.database[this.database.length - 1];
  }

  async updateTransaction(
    transaction_id: number,
    input: InputTransactionTypes,
  ) {
    let transactionIndex: any;
    this.database.forEach((data: TransactionType, index: any) => {
      if (data.id === transaction_id) transactionIndex = index;
    });
    this.database[transactionIndex].description = input.description;
    this.database[transactionIndex].value = input.value;
    this.database[transactionIndex].typeTransaction = input.typeTransaction;
    return this.database[transactionIndex];
  }

  async deleteTransaction(transaction_id: number) {
    const newDB = this.database.filter((data) => data.id !== transaction_id);
    this.database = newDB;
  }

  private getDateTime = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const miliSeconds = date.getMilliseconds();
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${miliSeconds}Z`;
  };
}
