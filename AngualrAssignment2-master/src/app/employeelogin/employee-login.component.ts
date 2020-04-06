import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { Employee } from '../shared/employee.model';
import { EmployeeService } from '../shared/employee.service';
import { Router } from '@angular/router';
@Component({
  selector:'employee-login',
  templateUrl: 'employee-login.component.html'
})
export class EmployeeLoginComponent implements OnInit {
  pageTitle:string = 'Employee login';
  employee:Employee;
  employees:Employee[];
  employeedetails:Employee[]=[];
  constructor(public service:EmployeeService,private router:Router){}

  ngOnInit(): void {
    //this.resetForm();
    this.employee=this.initializeEmployee();
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
  resetForm(form?:NgForm){
    if(form!=null){
    form.resetForm();
    }
    this.service.employee={
    id:0,
    name:'',
    dob:'',
    doj:'',
    salary:0,
    email:''
    }
  }
  emailAlredyExist:boolean=false;
  emailAlreadyExist = "";
  emid:string;
emailCheckUnique(email:string) {
this.service.getEmployees().subscribe({
  next: employee => {
    this.employees= employee;
    this.employeedetails = this.employees;
    this.employeedetails=this.employees.filter(a => a.email===email);
    if(this.employeedetails.length==0){

      this.emailAlredyExist = false;
      this.emailAlreadyExist="Email Id Does Not Exist"
    }
    else{
      this.emailAlredyExist = true;
      this.emailAlreadyExist='';
    }
  },
 });
}
}
