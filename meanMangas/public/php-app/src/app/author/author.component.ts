import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent implements OnInit {
  author!: Author;
  constructor(public authService : AuthenticationService) { }

  ngOnInit(): void {
  }
  onEditAuthor():void {

  }
}

export class Author{
  #_id!: String;
  #name !: String;
  #role !: [String];

  get _id ():String {return this.#_id;}
  get name ():String {return this.#name;}
  get role ():[String] {return this.#role;}

  set name (name : String){ this.#name = name;}
  set role (newRoles: [String]) {this.#role = newRoles;}

  private addRole(role : String) {
    this.#role.push(role);
  }

  constructor (){}
}
