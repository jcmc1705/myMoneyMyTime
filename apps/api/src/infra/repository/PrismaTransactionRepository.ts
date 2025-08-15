import { PrismaClient } from "@prisma/client";
import TransactionRepository from "../../application/repository/TransactionRepository";
import Transaction from "../../domain/entidy/Transaction";

export class PrismaTransactionRepository implements TransactionRepository {
  prisma: PrismaClient = new PrismaClient();

  async calculateSumByTransactionType(transactionType: "income" | "expense") {
    const result = await this.prisma.transaction.aggregate({
      _sum: {
        value: true,
      },
      where: {
        transactionType,
      },
    });
    return result._sum.value || 0;
  }

  async getAllTransactions(limit: number, offset: number) {
    return await this.prisma.transaction.findMany({
      skip: offset,
      take: limit,
    });
  }

  async getTotalTransactions() {
    return await this.prisma.transaction.count();
  }

  async getTransactionById(transactionId: number) {
    return await this.prisma.transaction.findUnique({
      where: { id: transactionId },
    });
  }

  async createTransaction(input: Transaction) {
    return await this.prisma.transaction.create({
      data: {
        description: input.getDescription(),
        value: input.getValue(),
        transactionType: input.getTransactionType(),
      },
    });
  }

  async updateTransaction(transactionId: number, input: Transaction) {
    return await this.prisma.transaction.update({
      where: { id: transactionId },
      data: {
        transactionType: input.getTransactionType(),
        value: input.getValue(),
        description: input.getDescription(),
      },
    });
  }

  async deleteTransaction(transactionId: number) {
    return await this.prisma.transaction.delete({
      where: { id: transactionId },
    });
  }
}
