import { PrismaClient } from '@prisma/client';
import { TransactionRepository } from './transactionRepositoryService';
import { TransactionType } from '../types/transactionType';

export class TransactionRepositoryPrisma implements TransactionRepository {
  prisma: PrismaClient = new PrismaClient();

  async calculateSumByTransactionType(typeTransaction: 'income' | 'expense') {
    const result = await this.prisma.transactions.aggregate({
      _sum: {
        value: true,
      },
      where: {
        typeTransaction,
      },
    });
    return result._sum.value || 0;
  };

  async getAllTransactions() {
    return await this.prisma.transactions.findMany();
  };

  async getTransactionById(transaction_id: number) {
    return await this.prisma.transactions.findUnique({
      where: { id: transaction_id },
    });
  }

  async createTransaction(input: any) {
    return await this.prisma.transactions.create({
      data: {
        typeTransaction: input.typeTransaction,
        value: Number(input.value),
        description: input.description,
      },
    });
  };

  async updateTransaction(transaction_id: number, input: TransactionType) {
    return await this.prisma.transactions.update({
      where: { id: transaction_id },
      data: {
        typeTransaction: input.typeTransaction,
        value: input.value,
        description: input.description,
      },
    })
  }

  async deleteTransaction(transaction_id: number) {
    return await this.prisma.transactions.delete({
      where: { id: transaction_id },
    });
  }
}