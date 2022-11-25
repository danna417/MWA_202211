import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Manga } from './mangas/mangas.component';

@Injectable({
  providedIn: 'root'
})
export class MangaDataService {
  private apiBaseUrl: string= "http://localhost:3001/api"

  constructor(private http:HttpClient) { }

  public getMangas(): Observable<Manga[]> {

    const url: string= this.apiBaseUrl + "/manga";
    
    return this.http.get<Manga[]>(url);
  }

  public getManga(mangaId: string): Observable<Manga> {
    const url: string= this.apiBaseUrl + "/manga/" + mangaId;
   console.log("getOne before be ", url)
    
    return this.http.get<Manga>(url);
  }

  public deleteManga(mangaId: string): Observable<Manga> {
    const url: string= this.apiBaseUrl + "/manga/" + mangaId;
    const headers = { 'authorization': 'Bearer ' + localStorage.getItem("token")};
    
    return this.http.delete<Manga>(url, { headers });
  }
  public addManga(newManga : Manga): Observable<Manga> {
    const headers = { 'authorization': 'Bearer ' + localStorage.getItem("token")}
    console.log(headers);
    const url: string= this.apiBaseUrl + "/manga";
    
    return this.http.post<Manga>(url, newManga,  { headers });
  }

//Todo 
  // public UpdateMangaFully(mangaId: string): Observable<Manga> {
  //   const url: string= this.apiBaseUrl + "/manga/" + mangaId;
    
  //   return this.http.delete<Manga>(url);
  // }

  // public UpdateMangaPartially(mangaId: string): Observable<Manga> {
  //   const url: string= this.apiBaseUrl + "/manga/" + mangaId;
    
  //   return this.http.delete<Manga>(url);
  // }

  // public InsertManga(mangaId: string): Observable<Manga> {
  //   const url: string= this.apiBaseUrl + "/manga/" + mangaId;
    
  //   return this.http.delete<Manga>(url);
  // }
}
