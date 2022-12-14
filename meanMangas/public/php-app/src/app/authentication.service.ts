import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Logger } from 'mongodb';
import { Token } from './login/login.component';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  #isLoggedIn: boolean = false;
  #username!: string;
  #isTokenExpired!: boolean;
  helper: JwtHelperService = new JwtHelperService();

  constructor() { }

  get isLoggedIn():boolean { return localStorage.getItem(environment.token) ? true : false;}
  set isLoggedIn(val: boolean) { 
      this.#isLoggedIn =  localStorage.getItem(environment.token) ? true : false;
  }

  get username():string {
    if(this.isLoggedIn) {
      let decodeToken: Token = this.helper.decodeToken(localStorage.getItem(environment.token)?.toString());
      return decodeToken.username;
    }
    return "";
  }

}
