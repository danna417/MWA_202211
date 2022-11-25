import { Component, OnInit } from '@angular/core';
import { Manga } from '../mangas/mangas.component';
import { MangaDataService } from '../manga-data.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-add-manga',
  templateUrl: './add-manga.component.html',
  styleUrls: ['./add-manga.component.css']
})
export class AddMangaComponent implements OnInit {
  manga !: Manga;
  addMangaForm !: FormGroup;
  env = environment;
  
  constructor(
      private router : Router, 
      private mangaDataServie : MangaDataService) { 
        this.manga = new Manga();
      }

  ngOnInit(): void {
    this.addMangaForm = new FormGroup ({
      japaneseTitle : new FormControl(""),
      englishTitle : new FormControl(""),
      published : new FormControl(""),
      status : new FormControl(""),
      authors : new FormControl(""),
      genres : new FormControl("")
    })
  }

  onAdd() : void{
    console.log("onADD starts")
    this.manga = this.addMangaForm.value;

    this.manga.titles = {
      japanese: this.addMangaForm.value.japaneseTitle, 
      english: this.addMangaForm.value.englishTitle
    };
    
    this.mangaDataServie.addManga(this.manga).subscribe(newmanga => {
      this.router.navigate(["manga/", newmanga._id])
    })
  }

}
