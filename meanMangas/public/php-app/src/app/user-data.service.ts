import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginResponse } from './login/login.component';
import { User } from './register/register.component';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  private apiBaseUrl: string= environment.base_url + environment.user_service_url;

  constructor(private http: HttpClient) { }

  public addUser(newUser : object): Observable<User> {
    const url: string= this.apiBaseUrl + environment.register_service_url;
    return this.http.post<User>(url, newUser);
  }

  public login(loginInfo: Object): Observable<LoginResponse> {
    const url: string= this.apiBaseUrl + environment.login_service_url;
    return this.http.post<LoginResponse>(url, loginInfo);
  }
}
