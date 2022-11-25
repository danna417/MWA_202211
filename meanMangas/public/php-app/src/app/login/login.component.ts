import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../user-data.service';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
// import { User } from '../register/register.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username!: string;
  password!: string;

  isLogin : boolean = false;
  loginFailureMsg : string = "Login Failed";

  // not able send post body using object
  // user : User = new User();
  constructor(
    private userService : UserDataService,
    private router : Router,
    public authService : AuthenticationService) { }

  ngOnInit(): void {
  }
  onLogOut():void {
    localStorage.clear();
    this.router.navigate(["/"]);
  }
  
  onLogin():void {
    console.log("Login");
    this.userService.login({
      username: this.username,
      password: this.password
    }).subscribe({
      next: (response) => {console.log(response); this._loginPrep(response)},
      error: (err) => {console.log(err)},
    })
 
    // not able send post body using object
    // this.user.password = this.password;
    // this.user.username = this.username;

    // this.userService.login(this.user).subscribe(response => {
    //   console.log("token", response);
    //   localStorage.setItem("token", response.token);
    // })
  }
  private _loginPrep(response : LoginResponse){
    console.log(response);
    if (response.success) {
      localStorage.setItem("token", response.token);
      this.router.navigate([""]);
      this.isLogin = true;
    } else {
      this.isLogin = false;
    }
  this.authService.username;

  }
}

export class LoginResponse {
  success!: boolean;
  token!: string;
}


export class Token {
  username!: string;
  exp!: number;
  iat!: number;
}
