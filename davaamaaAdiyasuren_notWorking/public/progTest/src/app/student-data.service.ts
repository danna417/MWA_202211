import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable } from 'rxjs';
import {Student} from './students/students.component';

@Injectable({
  providedIn: 'root'
})
export class StudentDataService {
  baseUrl : String = "http://localhost:3000";

  constructor(private http : HttpClient) { }

  public getStudents():  Observable <Student[]> {
    return this.http.get<Student[]>(this.baseUrl + "/students");
  }
}
