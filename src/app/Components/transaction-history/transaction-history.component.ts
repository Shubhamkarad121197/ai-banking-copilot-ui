import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { TransactionsService } from '../../Services/transactions.service';
import { AccountService } from '../../Services/account.service';

@Component({
  selector: 'app-transaction-history',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './transaction-history.component.html',
  styleUrl: './transaction-history.component.css'
})
export class TransactionHistoryComponent implements OnInit {

  // ================================
  // DATA
  // ================================

  accounts: any[] = [];

  transactions: any[] = [];

  accountId!: number;


  // ================================
  // UI STATES
  // ================================

  isLoadingAccounts = false;

  isLoadingTransactions = false;

  errorMessage = '';


  // ================================
  // CONSTRUCTOR
  // ================================

  constructor(
    private transactionService: TransactionsService,
    private accountService: AccountService
  ) {}


  // ================================
  // INIT
  // ================================

  ngOnInit(): void {

    this.loadAccounts();

  }


  // ================================
  // LOAD ACCOUNTS
  // ================================

  loadAccounts(): void {

    this.isLoadingAccounts = true;

    this.errorMessage = '';

    this.accountService
      .getMyAccounts()
      .subscribe({

        next: (data) => {

          this.accounts = data;

          this.isLoadingAccounts = false;

          console.log(
            'Accounts:',
            this.accounts
          );


          // Automatically select first account

          if (this.accounts.length > 0) {

            this.accountId =
              this.accounts[0].id;

            this.loadTransactionHistory();

          }

        },

        error: (error) => {

          this.isLoadingAccounts = false;

          this.errorMessage =
            error?.error?.message ||
            'Unable to load accounts.';

          console.error(
            'Failed to load accounts',
            error
          );

        }

      });

  }


  // ================================
  // LOAD TRANSACTION HISTORY
  // ================================

  loadTransactionHistory(): void {

    if (!this.accountId) {
      return;
    }


    this.isLoadingTransactions = true;

    this.errorMessage = '';

    this.transactions = [];


    this.transactionService
      .getTransactionHistory(this.accountId)
      .subscribe({

        next: (data) => {

          this.transactions = data;

          this.isLoadingTransactions = false;

          console.log(
            'Transaction History:',
            this.transactions
          );

        },

        error: (error) => {

          this.isLoadingTransactions = false;

          this.transactions = [];

          this.errorMessage =
            error?.error?.message ||
            'Unable to load transaction history.';

          console.error(
            'Failed to load transaction history',
            error
          );

        }

      });

  }


  // ================================
  // ACCOUNT CHANGE
  // ================================

  onAccountChange(): void {

    this.loadTransactionHistory();

  }


  // ================================
  // TOTAL BY TYPE
  // ================================

  getTotalByType(type: string): number {

    return this.transactions

      .filter(transaction =>
        transaction.transactionType === type
      )

      .reduce(
        (total, transaction) =>
          total + Number(transaction.amount),
        0
      );

  }


  // ================================
  // TRANSACTION TITLE
  // ================================

  getTransactionTitle(
    transaction: any
  ): string {

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


  // ================================
  // GET SELECTED ACCOUNT
  // ================================

  getSelectedAccount(): any {

    return this.accounts.find(
      account =>
        account.id == this.accountId
    );

  }

}