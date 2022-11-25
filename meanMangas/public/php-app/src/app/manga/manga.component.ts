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
  isupdateMode: boolean =  false;
  isAuthorAddMode: boolean =  false;
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
    this.authors = this.manga.authors;
  }

  onDeleteManga(): void{
    
    const mangaId = this.route.snapshot.params['mangaId'];

    console.log("deleteMAnga request", mangaId);
    this.mangaDataService.deleteManga(mangaId).subscribe(manga => {
      console.log("deleted manga: ", manga);
      
      this.router.navigate(["/mangas"])
    });
  }

  onCancelUpdate():void{
    this._resetUpdateMode();
  }

  onUpdateMode(): void{
    this.isupdateMode = true;
  }

  onAddAuthorMode(): void{
    this.isAuthorAddMode = true;
  }

  onUpdateInfo(): void{
    console.log("onUpdateInfo starts")
    const mangaId = this.route.snapshot.params['mangaId'];
    
    this.mangaDataService.UpdateMangaFully(mangaId,this.manga).subscribe(updtmanga => {
      this._resetUpdateMode();
      this.router.navigate(["manga/", mangaId])
    })
  }
  onUpdatePartialJapTitle():void{
    let titles={
      japanese : this.manga.titles.japanese
    }
    this._updatePartial(titles);
  }
  onUpdatePartialEngTitle():void{
    let titles={
      english : this.manga.titles.english
    }
    this._updatePartial(titles);
  }
  onUpdatePartialPublished():void{
    this._updatePartial({
      published: this.manga.published
    });
  }
  onUpdatePartialStatus():void{
    this._updatePartial({
      status: this.manga.status
    });
  }

  private _updatePartial(value: object):void{
    const mangaId = this.route.snapshot.params['mangaId'];
    this.mangaDataService.UpdateMangaPartially(mangaId, value).subscribe({
      next: (manga)=> { this._resetUpdateMode();this.router.navigate(["/manga/", manga._id])},
      error: (error)=>{ this.manga= new Manga(); console.log(error);
      },
    });
  }

  private _resetUpdateMode(): void{
    this.isupdateMode = false;
  }

}
