import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http:HttpClient) { }
  private apiURL='http://localhost:8081/api/accounts';

  createAccount(accountType:string):Observable<any>{
    return this.http.post(this.apiURL,{
      accountType:accountType
    });
  }

  getMyAccounts():Observable<any[]>{
    return this.http.get<any[]>(this.apiURL);
  }




}
