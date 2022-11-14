import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Winner } from './winners/winners.component';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WinnersService {
  baseUrl : String = 'http://localhost:3000';

  constructor( private http: HttpClient) { }

  public getWinners(offset:number, count:number) : Observable<Winner[]> {
    return this.http.get<Winner[]>(this.baseUrl + '/api/winners?offset=' + offset + '&count=' + count );
  }

  public getWinner(winnerId: String) : Observable<Winner> {
    return this.http.get<Winner>(this.baseUrl + '/api/winner/' + winnerId );

  }

  public deleteWinner(winnerId: String) : Observable<Winner> {
     return this.http.delete<Winner>(this.baseUrl + '/api/winner/' + winnerId );
  }

  public searchByBornCountry(offset:number, count:number, country : String) : Observable<Winner[]> {
    return this.http.get<Winner[]>(this.baseUrl + '/api/winners?bornCountry=' + country + '&offset=' + offset + '&count=' + count );
  }

  public addOne(body: Winner): Observable<Winner> {
    return this.http.post<Winner>(this.baseUrl + '/api/winners', body);
  }
}
