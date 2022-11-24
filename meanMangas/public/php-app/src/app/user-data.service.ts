import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginResponse } from './login/login.component';
import { User } from './register/register.component';


@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  private apiBaseUrl: string= "http://localhost:3001/api/user"

  constructor(private http: HttpClient) { }

  public addUser(newUser : object): Observable<User> {
    const url: string= this.apiBaseUrl + "/register";
    return this.http.post<User>(url, newUser);
  }

  public login(loginInfo: Object): Observable<LoginResponse> {
    const url: string= this.apiBaseUrl + "/login";
    console.log(loginInfo);
    return this.http.post<LoginResponse>(url, loginInfo);
  }
}
