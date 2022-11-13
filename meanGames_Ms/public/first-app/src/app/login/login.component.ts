import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string = "Test";
  password: string = "t123";

  @ViewChild("loginForm")
  loginForm!: NgForm;

  constructor() { }

  ngOnInit(): void {
    console.log("ngOnInit Login");
    
    setTimeout(() => {
      console.log("ngOnInit setTimeOut");
      console.log(this.loginForm.value);
      
    });
  }
onLogin() {
  console.log("Login clicked", this.loginForm.value);
}
}

//class Credentials{
  //   #username !: String;
  //   #password !: String;
  
  // get username(): String{
  //   return this.#username;
  // }
  // get password(): String{
  //   return this.#password;
  // }
  // set username(uname: String){
  //    this.#username = uname;
  // }
  // set password(pass: String){
  //    this.#password = pass;
  // }
  
  // constructor(uname: String, password:String){
  //   this.#password= password;
  //   this.#username=uname;
  // }
  // }