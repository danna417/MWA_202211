import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeesDataService } from '../employees-data.service';
import { Employee } from '../employees/employees.component';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  // employee:Employee= new Employee({_id: "123", employeeId: "123", location: {address: {street1: "", employee: "", state: "", zip: ""}, geo: {}}});
  employee:Employee= new Employee();
  constructor(private employeeService: EmployeesDataService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const employeeId: string= this.route.snapshot.params["employeeId"];
    
    this.employeeService.getCity(employeeId).subscribe({
      next: (employee)=> this.fillCity(employee),
      error: (error:any)=>{this.employee= new Employee(); console.log(error);
      },
    });
  }

  private fillCity(employee: Employee): void {
    this.employee= employee;
    console.log("this.employee",this.employee);
    
  }

  onPassEncrypt():void {
    const id: string = this.route.snapshot.params["employeeId"];
    console.log("enc");
    this.employeeService.encryptPassword(id).subscribe({
      next : (e) => this.fillCity(e),
      error : (err: any) => {this.employee = new Employee() ; console.log(err);
      },
    })
    
  }

}
