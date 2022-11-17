import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Employee } from '../employees/employees.component';
import { EmployeesDataService } from '../employees-data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchForm !: FormGroup;
   offset : number = 0;
   count : number = 5;

  employees !: Employee[];

  constructor(private empSer : EmployeesDataService) { }

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      name : new FormControl("Search")
    })
  }
  onSearch():void {
    console.log("Onsearch");
    
    console.log(this.searchForm.value.name);
    
    this.getData();
  }
  getData():void {
    this.empSer.getEmployees(this.offset, this.count, this.searchForm.value.name).subscribe(e => {
      this.employees = e;
    } );
  }

}
