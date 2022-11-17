import { Component, OnInit } from '@angular/core';
import { StudentDataService } from '../student-data.service';
import { Student } from '../students/students.component';
import { ActivatedRoute, Router} from '@angular/router'


@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  student !: Student;
  constructor(private stuSer : StudentDataService , private route  : ActivatedRoute, private router : Router) { }

  ngOnInit(): void {
    const studentId = this.route.snapshot.params["studentId"];
    this.stuSer.getStudent(studentId).subscribe( s => {
      this.student = s;
    });
  }

  onDelete(): void {
    const studentId = this.route.snapshot.params["studentId"];
    this.stuSer.deleteStudent(studentId).subscribe( s => {
      this.router.navigate([""]);

    });
  }
}
