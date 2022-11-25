import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Manga } from './mangas/mangas.component';
import { Author } from './author/author.component';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthorDataService {
  private apiBaseUrl: string= environment.base_url

  constructor(private http:HttpClient) { }

  public getAuthors(mangaId: String): Observable<Author[]> {

    const url: string= this.apiBaseUrl +environment.manga_service_url + mangaId +environment.author_service_url;
    
    return this.http.get<Author[]>(url);
  }

  public getAuthor(mangaId: string, authorId: string): Observable<Author> {
    const url: string= this.apiBaseUrl +environment.manga_service_url + mangaId +environment.author_service_url + authorId;
    return this.http.get<Author>(url);
  }

  public deleteAuthor(mangaId: string, authorId: string): Observable<Author> {
    const url: string= this.apiBaseUrl +environment.manga_service_url + mangaId +environment.author_service_url + authorId;
    const headers = this._buildHeader();
    
    return this.http.delete<Author>(url, {headers});
  }

  public addAuthor(newAuthor : Object, mangaId: string): Observable<Manga> {
    const url: string= this.apiBaseUrl + environment.manga_service_url + mangaId +environment.author_service_url;
    const headers = this._buildHeader();
    
    return this.http.post<Manga>(url, newAuthor, { headers });
  }

  public UpdateAuthorFully(authorId: string, mangaId: string, updtVal:Object): Observable<Manga> {
    const url: string= this.apiBaseUrl + environment.manga_service_url + mangaId +environment.author_service_url + authorId;
    const headers = this._buildHeader();
    
    return this.http.put<Manga>(url,  updtVal, { headers });
  }

private _buildHeader(){
  //authorization can not be read from environment
 return { 'authorization' : environment.token_bearer + localStorage.getItem(environment.token)}
}
  
}
