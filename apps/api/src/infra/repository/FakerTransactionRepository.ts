import TransactionRepository, {
  TransactionOutput,
} from "../../application/repository/TransactionRepository";
import Transaction from "../../domain/entidy/Transaction";

export class FakerTransactionRepository implements TransactionRepository {
  database: TransactionOutput[] = [
    {
      id: 1,
      transactionType: "income",
      value: 100,
      description: "Teste FakerDB 01",
      dateTime: new Date("2025-03-03T21:38:24.633Z"),
    },
    {
      id: 2,
      transactionType: "expense",
      value: 15,
      description: "Teste FakerDB 02",
      dateTime: new Date("2025-03-03T21:38:24.633Z"),
    },
    {
      id: 3,
      transactionType: "income",
      value: 100,
      description: "Teste FakerDB 03",
      dateTime: new Date("2025-03-03T21:38:24.633Z"),
    },
    {
      id: 4,
      transactionType: "expense",
      value: 150,
      description: "Teste FakerDB 04",
      dateTime: new Date("2025-03-03T21:38:24.633Z"),
    },
    {
      id: 5,
      transactionType: "expense",
      value: 25,
      description: "Teste FakerDB 05",
      dateTime: new Date("2025-03-03T21:38:24.633Z"),
    },
    {
      id: 6,
      transactionType: "income",
      value: 5,
      description: "Teste FakerDB 06",
      dateTime: new Date("2025-03-03T21:38:24.633Z"),
    },
  ];

  async calculateSumByTransactionType(transactionType: "income" | "expense") {
    let sum = 0;
    this.database.forEach((data) => {
      if (data.transactionType === transactionType) {
        sum = sum + data.value;
      }
    });
    return sum;
  }

  async getTotalTransactions() {
    return this.database.length;
  }

  async getAllTransactions(limit: number, offset: number) {
    let newDatabase = [];
    const databaseInDescOrder = this.database.sort(
      (a: any, b: any) => b.id - a.id,
    );
    for (let index = offset; index < offset + limit; index++) {
      if (databaseInDescOrder[index] !== undefined) {
        newDatabase.push(databaseInDescOrder[index]);
      }
    }
    return newDatabase;
  }

  async getTransactionById(transactionId: number) {
    const [transaction] = this.database.filter(
      (data) => data.id === transactionId,
    );
    return transaction;
  }

  async createTransaction(input: Transaction) {
    const transaction = {
      id: 3,
      description: input.getDescription(),
      value: input.getValue(),
      transactionType: input.getTransactionType(),
      dateTime: new Date("2025-03-03T21:38:24.633Z"),
    };
    this.database.push(transaction);
    const transactionCreated = this.database[this.database.length - 1];
    return transactionCreated;
  }

  async updateTransaction(transactionId: number, input: Transaction) {
    let transactionIndex: any;
    this.database.forEach((data, index) => {
      if (data.id === transactionId) transactionIndex = index;
    });
    this.database[transactionIndex].description = input.getDescription();
    this.database[transactionIndex].value = input.getValue();
    this.database[transactionIndex].transactionType =
      input.getTransactionType();
    return this.database[transactionIndex];
  }

  async deleteTransaction(transactionId: number) {
    const [transactionDeleted] = this.database.filter(
      (data) => data.id === transactionId,
    );
    const newDB = this.database.filter((data) => data.id !== transactionId);
    this.database = newDB;
    return transactionDeleted;
  }
}
