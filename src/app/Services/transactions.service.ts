import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {
  
  apiURL='http://localhost:8081/api/transactions';
  constructor(private http:HttpClient) { }

  deposit(data:any):Observable<any>{
    return this.http.post(`${this.apiURL}/deposit`,data);

  }

   withdraw(data:any):Observable<any>{
    return this.http.post(`${this.apiURL}/withdraw`,data);

  }

   transfer(data:any):Observable<any>{
    return this.http.post(`${this.apiURL}/transfer`,data);

  }
  getTransactionHistory(accountId: number):Observable<any[]>{
    return this.http.get<any[]>(`${this.apiURL}/account/${accountId}`)
  }
    
}
