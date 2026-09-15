import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

import { AccountService } from '../../Services/account.service';
import { TransactionsService } from '../../Services/transactions.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  // =========================
  // Data
  // =========================

  accounts: any[] = [];
  transactions: any[] = [];

  // =========================
  // Dashboard Statistics
  // =========================

  totalBalance = 0;
  totalDeposits = 0;
  totalWithdrawals = 0;
  totalAccounts = 0;

  isLoading = true;
  errorMessage = '';

  constructor(
    private accountService: AccountService,
    private transactionService: TransactionsService
  ) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  // =========================
  // Load Dashboard Data
  // =========================

  loadDashboardData(): void {

    this.isLoading = true;
    this.errorMessage = '';

    this.accountService.getMyAccounts().subscribe({

      next: (accounts) => {

        this.accounts = accounts;

        // Number of accounts
        this.totalAccounts = accounts.length;

        // Calculate total balance
        this.totalBalance = accounts.reduce(
          (total, account) =>
            total + Number(account.balance),
          0
        );

        console.log('Dashboard Accounts:', this.accounts);
        console.log('Total Balance:', this.totalBalance);

        // Load transactions for first account
        if (this.accounts.length > 0) {

          const firstAccountId = this.accounts[0].id;

          this.loadTransactions(firstAccountId);

        } else {

          this.isLoading = false;

        }
      },

      error: (error) => {

        console.error(
          'Failed to load dashboard accounts',
          error
        );

        this.errorMessage =
          error?.error?.message ||
          'Unable to load dashboard data.';

        this.isLoading = false;
      }

    });
  }

  // =========================
  // Load Transactions
  // =========================

  loadTransactions(accountId: number): void {

    this.transactionService
      .getTransactionHistory(accountId)
      .subscribe({

        next: (transactions) => {

          this.transactions = transactions;

          this.calculateTransactionStats();

          this.isLoading = false;

          console.log(
            'Dashboard Transactions:',
            this.transactions
          );
        },

        error: (error) => {

          console.error(
            'Failed to load transactions',
            error
          );

          this.transactions = [];

          this.isLoading = false;
        }

      });
  }

  // =========================
  // Calculate Transaction Stats
  // =========================

  calculateTransactionStats(): void {

    this.totalDeposits = this.transactions
      .filter(transaction =>
        transaction.transactionType === 'DEPOSIT'
      )
      .reduce(
        (total, transaction) =>
          total + Number(transaction.amount),
        0
      );

    this.totalWithdrawals = this.transactions
      .filter(transaction =>
        transaction.transactionType === 'WITHDRAW'
      )
      .reduce(
        (total, transaction) =>
          total + Number(transaction.amount),
        0
      );
  }

  // =========================
  // Recent Transactions
  // =========================

  getRecentTransactions(): any[] {

    return this.transactions.slice(0, 5);

  }

  // =========================
  // Transaction Title
  // =========================

  getTransactionTitle(transaction: any): string {

    switch (transaction.transactionType) {

      case 'DEPOSIT':
        return 'Money Deposited';

      case 'WITHDRAW':
        return 'Money Withdrawn';

      case 'TRANSFER':
        return 'Money Transfer';

      default:
        return 'Transaction';

    }
  }

  // =========================
  // Transaction Amount
  // =========================

  getTransactionAmount(transaction: any): number {

    if (transaction.transactionType === 'DEPOSIT') {
      return Number(transaction.amount);
    }

    return -Number(transaction.amount);
  }

}