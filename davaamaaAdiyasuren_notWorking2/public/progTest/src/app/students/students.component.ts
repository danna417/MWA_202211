import { Component, OnInit } from '@angular/core';
import { StudentDataService } from '../student-data.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {
  students : Student[] = [];
  constructor(private stuSer : StudentDataService) { }

  ngOnInit(): void {
    this.stuSer.getStudents().subscribe(studets => {
      this.students = studets;
    });
  }


}

export class Student{
  #_id !: String;
  #LastName !: String;
  #FirstName !: String;
  #City !: String;
  #State !: String;
  #Gender !: String;
  #StudentStatus !: String;
  #Major !: String;
  #Country !: String;
  #Age !: Number;
  #SAT !: Number;
  #Grade !: Number;
  #Height !: Number;
  
  get _id() {return this.#_id; }
  get LastName() {return this.#LastName;}
  get FirstName() {return this.#FirstName;}
  get City() {return this.#City}
  get State() {return this.#State}
  get Gender() {return this.#Gender }
  get StudentStatus() {return this.#StudentStatus}
  get Major() {return  this.#Major}
  get Country() {return  this.#Country}
  get Age() {return this.#Age}
  get SAT() {return this.#SAT}
  get Grade() {return this.#Grade}
  get Height() {return this.#Height};

  
}
