import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { City } from './cities/cities.component';

@Injectable({
  providedIn: 'root'
})
export class CitiesDataService {
  private apiBaseUrl: string= "http://localhost:3000/api"

  constructor(private http:HttpClient) { }

  public getCities(): Observable<City[]> {
    const url: string= this.apiBaseUrl + "/cities";
    
    return this.http.get<City[]>(url);
  }

  public getCity(cityId: string): Observable<City> {
    const url: string= this.apiBaseUrl + "/cities/" + cityId;
    
    return this.http.get<City>(url);
  }

  public deleteCity(cityId: string): Observable<City> {
    const url: string= this.apiBaseUrl + "/cities/" + cityId;
    
    return this.http.delete<City>(url);
  }

}
