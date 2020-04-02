import {Component, OnInit} from '@angular/core';
import { EmployeeService } from '../shared/employee.service';
import { Employee } from '../shared/employee.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector:'employee-list',
  templateUrl:'./employee-details.component.html'
})
export class EmployeeDetailsComponent implements OnInit{
public pageTitle="Employee Details";
employeedetails:Employee[]=[];
employee:Employee[];
  constructor(private service:EmployeeService,
    private http:HttpClient,
    private router:Router){}

  ngOnInit():void {
    this.service.getEmployees().subscribe({
      next: employee => {
        this.employee = employee;
        this.employeedetails = this.employee;
      },
     });
   /* alert(`hello world`);
    this.http.get('http://localhost:5594/api/Employee').subscribe(
      data => {
       this.employee = data as Employee [];
      },
      err => {
        console.log(err);
      }
    );
   //this.service.getDetails();*/
  }

  DeleteEmployee(id){
    this.service.deleteEmployee(id).subscribe(
      res =>{

        this.onSaveComplete();
      },
      err=>{
        console.log(err);
      }
    )
  }
   onSaveComplete(): void {
    this.service.getEmployees().subscribe({
      next: employee => {
        this.employee = employee;
        this.employeedetails = this.employee;
      },
     });
    //this.router.navigate(['/employeedetails']);
   }
}
