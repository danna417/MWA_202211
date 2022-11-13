import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registrationForm !: FormGroup;
  constructor() { }

  ngOnInit(): void {
    this.registrationForm = new FormGroup ({
      name : new FormControl("default name"),
      username : new FormControl("default username"),
      password : new FormControl("default password"),
      passwordrep : new FormControl("default password repeat")
    })
  }
  onSubmit():void {
    console.log("onSubmit clicked");
    console.log(this.registrationForm.value);
    console.log(this.registrationForm.value.name);
    console.log(this.registrationForm.value.username);
    console.log(this.registrationForm.value.password);
    console.log(this.registrationForm.value.passwordrep);
    
  }
}
