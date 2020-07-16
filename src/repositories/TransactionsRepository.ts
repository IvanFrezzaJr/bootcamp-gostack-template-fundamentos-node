import Transaction from '../models/Transaction';
import { uuid } from 'uuidv4';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface RepositoryDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome'; 
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {

    const income = this.transactions.filter(
      transaction => transaction.type == "income")
      .reduce((lastvalue, currentvalue) => (lastvalue + currentvalue.value), 0);
  
    const outcome = this.transactions.filter(
      transaction => transaction.type == 'outcome')
      .reduce((lastvalue, currentvalue) => (lastvalue + currentvalue.value), 0);

    const total = income - outcome;

    const balance = {
      income,
      outcome,
      total
    }

    return balance;
  }

  public create({ title, type, value }: RepositoryDTO): Transaction {

    const transaction = new Transaction({title, type, value});

    this.transactions.push(transaction);

    return transaction;

  }
}

export default TransactionsRepository;
