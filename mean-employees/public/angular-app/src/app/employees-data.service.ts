import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Employee } from './employees/employees.component';

@Injectable({
  providedIn: 'root'
})
export class EmployeesDataService {
  private apiBaseUrl: string= "http://localhost:3000/api"

  constructor(private http:HttpClient) { }

  public getEmployees(offset: number = 0, count: number = 5, name : String = ""): Observable<Employee[]> {
   let query = "?offset=" + offset + "&count=" + count;
    if(name !== "") {query += "&name=" + name;}

    const url: string= this.apiBaseUrl + "/employees" + query;
    
    return this.http.get<Employee[]>(url);
  }

  public encryptPassword(id : string): Observable<Employee> {

    const url: string= this.apiBaseUrl + "/employees/" + id ;
    
    return this.http.patch<Employee>(url, "");
  }

  public getCity(employeeId: string): Observable<Employee> {
    const url: string= this.apiBaseUrl + "/employees/" + employeeId;
    
    return this.http.get<Employee>(url);
  }
}
