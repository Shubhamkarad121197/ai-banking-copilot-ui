import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private apiUrl='http://localhost:8081/api/auth';

  constructor(private http:HttpClient) {

   }

   register(data:any):Observable<any>{
    return this.http.post(
      `${this.apiUrl}/register`,
      data);
   }
}
