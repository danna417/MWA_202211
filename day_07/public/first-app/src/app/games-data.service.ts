import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Games } from './games/games.component';

@Injectable({
  providedIn: 'root'
})
export class GamesDataService {

  baseUrl : String = 'http://localhost:3000';

  constructor(private http:HttpClient) { }

  public getGames(): Observable<Games[]>{
    return this.http.get<Games[]>(this.baseUrl + '/games');
  }
  
  public getGame(gameId: String) : Observable<Games> {
    return this.http.get<Games>(this.baseUrl + '/game/' + gameId );

  }
}

