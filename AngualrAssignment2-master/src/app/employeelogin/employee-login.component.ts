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

  constructor(public service:EmployeeService,private router:Router){}

  ngOnInit(): void {
    this.resetForm();
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
}
