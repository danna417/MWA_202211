import { Component, OnInit } from '@angular/core';
import { MangaDataService } from '../manga-data.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Author } from '../author/author.component';
import { AuthenticationService } from '../authentication.service';
import { environment } from 'src/environments/environment';

export class Manga {

  #_id!: String;
  #titles!: {
    japanese: String,
    english: String
  };
  #published!: Number;
  #status!: String;
  #genres!: [String];
  #authors!: [Author];

  get _id() { return this.#_id;}
  get japanese() {return this.#titles.japanese;}
  get english() {return this.#titles.english;}
  get titles() {return this.#titles;}
  get published() { return this.#published;}
  get status() { return this.#status;}
  get genres() { return this.#genres;}
  get authors() { return this.#authors;}

  set _id(_id: String) { this.#_id = _id;}
  set japanese(japanese) { this.#titles.japanese = japanese;}
  set english(english) { this.#titles.english = english;}
  set titles(title: {japanese: String, english: String}) { this.#titles = title;}
  set published(published: Number) { this.#published = published;}
  set status(status: String) { this.#status = status;}
  set genres(genres: [String]) { this.#genres = genres;}
  set authors(authors: [Author]) { this.#authors = authors;}  

  constructor ()   {
    this.titles = {japanese : "", english : ""};
  }
}

@Component({
  selector: 'app-mangas',
  templateUrl: './mangas.component.html',
  styleUrls: ['./mangas.component.css']
})
export class MangasComponent implements OnInit {
  mangas !: Manga[];
  searchForm !: FormGroup;
  page : number = 1;
  offset : number = 0;
  count : number = 5;
  env = environment;

  constructor(private mangaDataService : MangaDataService, public authService: AuthenticationService) { }

  ngOnInit(): void {
    this.getData();
    this.searchForm = new FormGroup({
      title: new FormControl("")
    });
  }

  private getData(): void{
    this.mangaDataService.getMangas().subscribe({
      next: (mangas)=> this.fillMangas(mangas),
      error: (error)=>{this.mangas= []; console.log(error);
      },
    });
  }
  onSearch():void{
    this.getData();
  }

  private fillMangas(mangas: Manga[]) {
    this.mangas= mangas;
  }

  onPrev(): void{
    if(this.offset > 0) {
      this.offset-= this.count;
      this.page--;
      this.getData();
    }
  }

  onNext(): void{
    console.log(this.offset);
    
  //  if(this.offset < this.winners.length - this.count) {
      this.offset+= this.count;
      this.page++;
      this.getData();
    //}
  }
}

