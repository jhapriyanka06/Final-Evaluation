import { Component } from '@angular/core';
import {NgForm} from '@angular/forms';
import { Employee } from '../shared/employee.model';
@Component({
  selector:'employee-login',
  templateUrl: 'employee-login.component.html'
})
export class EmployeeLoginComponent {
  pageTitle:string = 'Employee login';
  employee:Employee;
}
