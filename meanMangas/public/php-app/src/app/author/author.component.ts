import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { AuthorDataService } from '../author-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent implements OnInit {
  author: Author = new Author();
  isAuthorEdit: boolean = false;
  mangaId!: string;
  authorId!: string;
  env = environment;
  constructor(
    private authorDataService : AuthorDataService,
    private router : Router,
    private route : ActivatedRoute,
    public authService : AuthenticationService) {     }

  ngOnInit(): void {
    this.authorId= this.route.snapshot.params["authorId"];
    this.mangaId= this.route.snapshot.params["mangaId"];

    if(this.authorId) this.isAuthorEdit = true;
    this._getData(this.authorId);
  }

  private _getData(authorId: string){
    if(this.isAuthorEdit){
      this.authorDataService.getAuthor(this.mangaId,this.authorId).subscribe({
        next: (author)=> this._fillAuthor(author),
        error: (error)=>{this.author= new Author(); console.log(error);
        },
      });
    }
  }
  
  onEditAuthor():void {
    this.authorDataService.UpdateAuthorFully(this.authorId, this.mangaId,{
      name: this.author.name,
      role: this.author.role
    }).subscribe({
        next: (manga)=> {console.log("author added ", manga); this.router.navigate(["manga/" , this.mangaId]);},
        error: (error)=>{console.log(error);},
    });
  }
  onAddAuthor():void {
  const mangaId: string= this.route.snapshot.params["mangaId"];

    this.authorDataService.addAuthor({
      name: this.author.name,
      role: this.author.role
    }, this.mangaId).subscribe({
        next: (manga)=> {console.log("author added ", manga); this.router.navigate(["manga/" , this.mangaId]);},
        error: (error)=>{console.log(error);},
    });
  }
  onAuthor():void {
    if(this.isAuthorEdit){
      this.onEditAuthor();
    }else{
      this.onAddAuthor();
    }
  }

  private _fillAuthor(author: Author) {
    this.author= author;
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
