import { Component, OnInit } from '@angular/core';
import { Employee } from '../shared/employee.model';
import { EmployeeService } from '../shared/employee.service';
import { NgForm } from '@angular/forms';

import {ActivatedRoute, Router} from '@angular/router';
@Component({
  selector:'employee-form',
  templateUrl: './employee.component.html'
})
export class EmployeeComponent implements OnInit {
  pageTitle:string = 'Add Employee';
  errorMessage:string;
  employee:Employee;
  employees:Employee[];
  employeedetails:Employee[]=[];

  constructor(public service:EmployeeService,private router:Router,private route:ActivatedRoute){}
  ngOnInit(): void {
    this.employee=this.initializeEmployee();
    const id=+this.route.snapshot.paramMap.get('id');
    this.getEmp(id);
  }
  onSubmit(employee:Employee){
    if(employee.id==0)
    {
      this.insertEmployee(employee);
     //alert(employee.id);
    }
    else{
      this.updateEmployee(employee);
     // alert(employee.id);
    }

  }
  insertEmployee(employee:Employee){
    this.service.postEmployee(employee).subscribe(
      res =>{
        alert(`employee successfully added`);
        this.onSaveComplete();
      },
      err=>{
        console.log(err);
      }
    )
  }
  updateEmployee(employee:Employee){
    this.service.putEmployee(employee).subscribe(
      res =>{
        alert(`employee successfully updated`);
        this.onSaveComplete();
      },
      err=>{
        console.log(err);
      }
    )
  }
  onSaveComplete(): void {

    this.router.navigate(['/employeedetails']);
   }
   getEmp(id:number):void{
    this.service.getEmp(id).subscribe({
         next:employee  => this.onEmployeeRetrieved(employee),
         error:err => this.errorMessage=err
    });
}
  onEmployeeRetrieved(employee: Employee): void {
    this.employee = employee;

    if (!this.employee) {
      this.pageTitle = 'No Employee found';
    } else {
      if (this.employee.id === 0) {
        this.pageTitle = 'Add Employee';
      } else {
        this.pageTitle = `Edit Employee: ${this.employee.name}`;
      }
    }
  }
  public initializeEmployee(): Employee {
    // Return an initialized object
    return {
      id:0,
    name:'',
    dob:'',
    doj:'',
    salary:0,
    email:''
    }
  }
  emailAlredyExist = "";
  emid:string;
emailCheckUnique(email:string) {
this.service.getEmployees().subscribe({
  next: employee => {
    this.employees= employee;
    this.employeedetails = this.employees;
    this.employeedetails=this.employees.filter(a => a.email===email);
    if(this.employeedetails.length>0){
      this.emailAlredyExist = "Email Already Exists";
    }
    else{
      this.emailAlredyExist = "";
    }
  },
 });
}
}
