import { Injectable } from '@angular/core';
import { Employee } from './employee.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { throwError, Observable, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { Leaves } from './Leaves.model';
@Injectable({
  providedIn: 'root'
})

export class LeavesService {
  employee:Employee;
  readonly rooturl='http://localhost:5594/api';
  list:Leaves[];

  constructor(private http:HttpClient){}

  postLeave(leave:Leaves){
   return this.http.post(this.rooturl+'/Leaves',leave);
  }
}
