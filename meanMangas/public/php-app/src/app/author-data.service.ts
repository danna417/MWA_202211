import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Author } from './author/author.component';

@Injectable({
  providedIn: 'root'
})
export class AuthorDataService {
  private apiBaseUrl: string= "http://localhost:3001/api"

  constructor(private http:HttpClient) { }

  public getAuthors(mangaId: String): Observable<Author[]> {

    const url: string= this.apiBaseUrl + "/manga" + mangaId + "/author";
    
    return this.http.get<Author[]>(url);
  }

  public getAuthor(mangaId: string, authorId: string): Observable<Author> {
    const url: string= this.apiBaseUrl + "/manga" + mangaId + "/author/" + authorId;
   console.log("getOne before be ", url)
    
    return this.http.get<Author>(url);
  }

  public deleteAuthor(mangaId: string, authorId: string): Observable<Author> {
    const url: string= this.apiBaseUrl + "/manga" + mangaId + "/author/" + authorId;
    
    return this.http.delete<Author>(url);
  }

  public addAuthor(newAuthor : Author, mangaId: string, authorId: string): Observable<Author> {
    const url: string= this.apiBaseUrl + "/manga" + mangaId + "/author/" + authorId;
    
    return this.http.post<Author>(url, newAuthor);
  }

//Todo 
  // public UpdateAuthorFully(AuthorId: string): Observable<Author> {
  //   const url: string= this.apiBaseUrl + "/Author/" + AuthorId;
    
  //   return this.http.delete<Author>(url);
  // }

  // public UpdateAuthorPartially(AuthorId: string): Observable<Author> {
  //   const url: string= this.apiBaseUrl + "/Author/" + AuthorId;
    
  //   return this.http.delete<Author>(url);
  // }

  // public InsertAuthor(AuthorId: string): Observable<Author> {
  //   const url: string= this.apiBaseUrl + "/Author/" + AuthorId;
    
  //   return this.http.delete<Author>(url);
  // }
}
