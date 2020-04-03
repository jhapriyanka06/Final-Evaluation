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
_listFilter:string;
get listFilter():string{
    return this._listFilter;
}
set listFilter(value:string){
    this._listFilter=value;
    this.employee=this.listFilter?this.performFilter(this.listFilter):this.employeedetails;
}
performFilter(filterBy: string): Employee[]{
  filterBy=filterBy.toLocaleLowerCase();
  return this.employeedetails.filter((employee : Employee) =>
  employee.name.toLocaleLowerCase().indexOf(filterBy) !== -1);

}
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
