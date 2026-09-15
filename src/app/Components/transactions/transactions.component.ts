import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { TransactionsService } from '../../Services/transactions.service';
import { AccountService } from '../../Services/account.service';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.css'
})
export class TransactionsComponent implements OnInit {

  depositForm!: FormGroup;
  withdrawForm!: FormGroup;
  transferForm!: FormGroup;

  // Store user accounts
  accounts: any[] = [];

  constructor(
    private fb: FormBuilder,
    private http: TransactionsService,
    private accountService: AccountService
  ) {

    // Deposit Form
    this.depositForm = this.fb.group({
      accountId: ['', Validators.required],
      amount: ['', [
        Validators.required,
        Validators.min(0.01)
      ]],
      description: ['']
    });

    // Withdraw Form
    this.withdrawForm = this.fb.group({
      accountId: ['', Validators.required],
      amount: ['', [
        Validators.required,
        Validators.min(0.01)
      ]],
      description: ['']
    });

    // Transfer Form
    this.transferForm = this.fb.group({
      senderAccountId: ['', Validators.required],
      receiverAccountId: ['', Validators.required],
      amount: ['', [
        Validators.required,
        Validators.min(0.01)
      ]],
      description: ['']
    });
  }

  ngOnInit(): void {
    this.loadAccounts();
  }

  // Load user's accounts
  loadAccounts(): void {
    this.accountService.getMyAccounts().subscribe({
      next: (data) => {
        this.accounts = data;

        console.log('Accounts:', this.accounts);
      },

      error: (error) => {
        console.error('Failed to load accounts', error);
      }
    });
  }

  deposit(): void {

    if (this.depositForm.invalid) {
      this.depositForm.markAllAsTouched();
      return;
    }

    const payload = this.depositForm.value;

    this.http.deposit(payload).subscribe({
      next: (res) => {
        console.log(res);
        alert('Money Deposited Successfully');
        this.depositForm.reset();
      },

      error: (err) => {
        console.log('Deposit Failed', err);
        alert(
          err.error?.message ||
          'Deposit Failed!!'
        );
      }
    });
  }

  withdraw(): void {

    if (this.withdrawForm.invalid) {
      this.withdrawForm.markAllAsTouched();
      return;
    }

    const payload = this.withdrawForm.value;

    this.http.withdraw(payload).subscribe({
      next: (res) => {
        console.log(res);
        alert('Money Withdraw Successfully');
        this.withdrawForm.reset();
      },

      error: (err) => {
        console.log('Withdraw Failed', err);

        alert(
          err.error?.message ||
          'Money Withdraw Failure'
        );
      }
    });
  }

  transfer(): void {

    if (this.transferForm.invalid) {
      this.transferForm.markAllAsTouched();
      return;
    }

    const payload = this.transferForm.value;

    console.log('Transfer Payload:', payload);

    this.http.transfer(payload).subscribe({
      next: (res) => {
        console.log(res);
        alert('Money Transfer Successfully');
        this.transferForm.reset();
      },

      error: (error) => {
        console.error('Transfer Failed', error);

        alert(
          error.error?.message ||
          'Transfer Money Failed'
        );
      }
    });
  }
}