import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../Services/account.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
  selector: 'app-accounts',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.css'
})
export class AccountsComponent implements OnInit {

  accounts: any[] = [];

  accountCreationForm!:FormGroup;

  constructor(
    private accountService: AccountService,
    private fb:FormBuilder
  ) {

    this.buildForm();
  }



  ngOnInit(): void {
    console.log('Accounts Component Initialized');

    this.getMyAccounts();
  }
  buildForm(){
    this.accountCreationForm=this.fb.group({
      accountType:[
        '',[Validators.required]
      ]
    })
  }

  createAccount(){
    if(this.accountCreationForm.invalid){
      this.accountCreationForm.markAllAsTouched();
      return;
    }
    const accountType=this.accountCreationForm.get('accountType')?.value;
    this.accountService.createAccount(accountType).subscribe({
      next:(res)=>{
        console.log(res);
        alert("Account Created Successfully");
      },
      error:(error)=>{
        console.log(error);
         alert(
            error.error?.message ||
            'Failed to create account'
          );
      }
    })
  }
  getMyAccounts(): void {

    console.log('Calling Account API...');

    this.accountService
      .getMyAccounts()
      .subscribe({

        next: (data) => {
          console.log('API Response:', data);
          this.accounts = data;
        },

        error: (error) => {
          console.error('API Error:', error);
        }

      });
  }
}