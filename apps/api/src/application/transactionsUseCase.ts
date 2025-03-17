import { TransactionRepository } from '../database/transactionRepositoryService';
import { TransactionType } from '../types/transactionType';

export class TransactionsUseCase {
  constructor(readonly transactionRepository: TransactionRepository) {}

  private isValidValue = (value: number) => value > 0;
  private isValidTypeTransaction = (typeTransaction: string) => {
    return typeTransaction === 'expense' || typeTransaction === 'income';
  };
  private isValidDescription = (description: string | null) => {
    return description !== null && description.length >= 3 && description.length <= 50
  }
  private isValidTransactionId = (transaction_id: number) => {
    return Number.isInteger(transaction_id) && transaction_id > 0
  }

  private validateTransaction(input: TransactionType) {
    if (!this.isValidValue(input.value)) throw new Error('Valor deve ser um número maior que zero!');
    if (!this.isValidTypeTransaction(input.typeTransaction)) throw new Error('Tipo de transação inválida!');
    if (!this.isValidDescription(input.description)) throw new Error('Descrição deve possuir entre 3 e 50 caracteres!');
  }

  async getTransactions() {
    return await this.transactionRepository.getAllTransactions();
  }

  async createTransaction(input: TransactionType) {
    this.validateTransaction(input)
    const transaction = await this.transactionRepository.createTransaction(input);
    return {
      data: transaction,
      message: 'Transação criada!',
    };
  };

  async getTransaction(transaction_id: number) {
    if (!this.isValidTransactionId(transaction_id)) throw new Error('Id inválido!')
    const transaction = await this.transactionRepository.getTransactionById(transaction_id)
    if (!transaction) throw new Error('Transação não encontrada!')
    return transaction
  }

  async updateTransaction(transaction_id: number, input: TransactionType) {
    await this.getTransaction(transaction_id)
    this.validateTransaction(input)
    const transaction = await this.transactionRepository.updateTransaction(transaction_id, input)
    return {
      data: transaction,
      message: 'Transação atualizada!',
    };
  };

  async deleteTransaction(transaction_id: number) {
    await this.getTransaction(transaction_id)
    this.transactionRepository.deleteTransaction(transaction_id)
    return {
      message: 'Transação excluída!',
    };
  }
};