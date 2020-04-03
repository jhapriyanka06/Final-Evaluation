import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Employee } from '../shared/employee.model';
import { EmployeeService } from '../shared/employee.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector:'employee-profile',
  templateUrl: 'employee-profile.component.html'



})
export class EmployeeProfileComponent implements OnInit {
  errorMessage:string;
  pageTitle:string = 'Profile';
  employee:Employee;
  constructor(private services:EmployeeService,private route: ActivatedRoute,private router:Router){}
  ngOnInit(): void {
    this.employee=this.initializeEmployee();
    const email=this.route.snapshot.paramMap.get('email');
    this.getEmpProfile(email);
  }
  private initializeEmployee(): Employee {
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
  getEmpProfile(email:string):void{
    this.services.getEmpProfile(email).subscribe({
         next:employee  => this.onEmployeeRetrieved(employee),
         error:err => this.errorMessage=err
    });
}
  onEmployeeRetrieved(employee: Employee): void {
    this.employee = employee;

    if (!this.employee) {
      this.pageTitle = 'No Employee found';
      alert(`No Employee Found`);
      this.router.navigate(['/employeelogin']);

    } else {
      if (this.employee.email === null) {
        this.pageTitle = 'No Employee With This Mail Id Exists';
        alert(`No Employee Found`);
        this.router.navigate(['/employeelogin']);


      } else {

        this.pageTitle = `Profile Of Employee: ${this.employee.name}`;
      }
    }
  }
}
