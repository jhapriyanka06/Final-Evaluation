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

  constructor(public service:EmployeeService,private router:Router,private route:ActivatedRoute){}
  ngOnInit(): void {
    this.resetForm();
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
        //this.resetForm(form);
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
        //this.resetForm(form);
        this.onSaveComplete();
      },
      err=>{
        console.log(err);
      }
    )
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

  /*saveEmployee(forms:NgForm): void {
    if(true === true){
      if (this.employee.id != 0) {
        this.service.updateEmployee(this.employee).subscribe({
          next: () => this.onSaveComplete(),
          error: err => this.errorMessage = err
        });
      } else {
        this.service.postEmployee().subscribe(
          res =>{
            this.resetForm(forms);
            this.onSaveComplete();
          },
          err=>{
            console.log(err);
          }
        )

      }
    }
  }*/
}
