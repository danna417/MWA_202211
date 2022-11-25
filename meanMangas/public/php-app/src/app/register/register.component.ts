import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { UserDataService } from '../user-data.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: User = new User();
  username!: string;
  password!: string;
  env = environment;

  constructor(private userService: UserDataService, private router: Router) {
   }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.userService.addUser({
      username: this.username,
      password: this.password
    }).subscribe({
        next: (user)=> {console.log("regsitered user", user); this.router.navigate([this.env.nav_mangas]);},
        error: (error)=>{console.log(error);},
    });
  
}
}

export class User{
  #username !: string;
  #password !: string;

  get username():string { return this.#username;}
  get password():string  {return this.#password;}
  set username(username: string) { this.#username = username;}
  set password(password: string) { this.#password = password;}
  constructor () {}
}

