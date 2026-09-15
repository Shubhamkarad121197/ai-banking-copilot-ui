import { Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { AccountsComponent } from './Components/accounts/accounts.component';
import { TransactionsComponent } from './Components/transactions/transactions.component';
import { TransactionHistoryComponent } from './Components/transaction-history/transaction-history.component';
import { AiChatComponent } from './Components/ai-chatbot/ai-chatbot.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'accounts',
    component: AccountsComponent,
  },
  {path:'transactions',
    component:TransactionsComponent
  },
  {
    path:"transactionHistory",
    component:TransactionHistoryComponent
  },
  {
  path: 'ai-chat',
  component:AiChatComponent
},
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];
