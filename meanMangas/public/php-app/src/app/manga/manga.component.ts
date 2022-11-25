import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Author } from '../author/author.component';
import { MangaDataService } from '../manga-data.service';
import { Manga } from '../mangas/mangas.component';
import { AuthenticationService } from '../authentication.service';
@Component({
  selector: 'app-manga',
  templateUrl: './manga.component.html',
  styleUrls: ['./manga.component.css']
})
export class MangaComponent implements OnInit {

  manga: Manga =  new Manga;
  authors:Author[] = [];
  constructor( 
    private mangaDataService : MangaDataService,
    private router : Router,
    private route : ActivatedRoute,
    public authService : AuthenticationService) { }

  ngOnInit(): void {
    const mangaId: string= this.route.snapshot.params["mangaId"];

    this.mangaDataService.getManga(mangaId).subscribe({
      next: (manga)=> this._fillManga(manga),
      error: (error)=>{this.manga= new Manga; console.log(error);
      },
    });
  }

  private _fillManga(manga: Manga) {
    this.manga= manga;
    console.log("getManga on Angu", this.manga)
  this.authors = this.manga.authors;
  
  console.log("getManga on ", this.authors)
  console.log("getManga on A", this.authors[0]);

  }

  onDeleteManga(): void{
    
    const mangaId = this.route.snapshot.params['mangaId'];

    console.log("deleteMAnga request", mangaId);
    this.mangaDataService.deleteManga(mangaId).subscribe(manga => {
      console.log("deleted manga: ", manga);
      
      this.router.navigate(["/mangas"])
    });
  }
  onUpdate(): void{
    
    const mangaId = this.route.snapshot.params['mangaId'];

    console.log("deleteMAnga request", mangaId);
    this.mangaDataService.deleteManga(mangaId).subscribe(manga => {
      console.log("deleted manga: ", manga);
      
      this.router.navigate(["/mangas"])
    });
  }
}
