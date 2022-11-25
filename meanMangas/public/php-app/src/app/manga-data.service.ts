import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Manga } from './mangas/mangas.component';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MangaDataService {
  private apiBaseUrl: string= environment.base_url;

  constructor(private http:HttpClient) { }

  public getMangas(offset:number, count:number, titleEng : String): Observable<Manga[]> {
    const searchQuery = this._buildSearchQuery(offset, count, titleEng);
    const url: string= this.apiBaseUrl + environment.manga_service_url+ searchQuery;
    
    return this.http.get<Manga[]>(url);
  }

  public getManga(mangaId: string): Observable<Manga> {
    const url: string= this.apiBaseUrl + environment.manga_service_url + mangaId;
    return this.http.get<Manga>(url);
  }

  public deleteManga(mangaId: string): Observable<Manga> {
    const url: string= this.apiBaseUrl + environment.manga_service_url + mangaId;
    const headers = this._buildHeader();
    
    return this.http.delete<Manga>(url, { headers });
  }
  public addManga(newManga : Manga): Observable<Manga> {
    const headers = this._buildHeader();
    const url: string= this.apiBaseUrl + environment.manga_service_url;
    
    return this.http.post<Manga>(url, newManga,  { headers });
  }

  public UpdateMangaPartially(mangaId: string, updtValue:Object): Observable<Manga> {
    const headers = this._buildHeader();
    const url: string= this.apiBaseUrl + environment.manga_service_url + mangaId;
    
    return this.http.patch<Manga>(url, updtValue , { headers });
  }

  public UpdateMangaFully(mangaId: String, updtManga:Manga): Observable<Manga> {
    const headers = this._buildHeader();

    const url: string= this.apiBaseUrl + environment.manga_service_url + mangaId;
    
    return this.http.put<Manga>(url, updtManga , { headers });
  }
  
private _buildHeader(){
  //authorization can not be read from environment
 return { 'authorization' : environment.token_bearer + localStorage.getItem(environment.token)}
}
private _buildSearchQuery(offset:number, count:number, titleEng : String){
  //authorization can not be read from environment
  let search : string = "?" + environment.query_offset + offset + "&" +environment.query_count + count
  if(titleEng) search += "&"+environment.query_title+titleEng;
  return search;
}
}
