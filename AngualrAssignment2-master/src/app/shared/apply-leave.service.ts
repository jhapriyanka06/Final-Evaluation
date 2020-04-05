import { Injectable } from '@angular/core';
import { Employee } from './employee.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { throwError, Observable, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { EmployeeLeaveMapping } from './apply-leave.model';

@Injectable({
  providedIn: 'root'
})

export class ApplyLeaveService{

  readonly rooturl='http://localhost:5594/api';

  constructor(private http:HttpClient){}

  getLeaveList(id:number):Observable<EmployeeLeaveMapping>{
    if (id === 0) {
      return of(this.initializeList());
    }
    const url = `${this.rooturl+'/EmployeeLeaveMapping'}/${id}`;
    return this.http.get<EmployeeLeaveMapping>(url)
      .pipe(
        tap(data => console.log('getEmployee: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }
  getLeaves():Observable<EmployeeLeaveMapping[]>{
    return this.http.get<EmployeeLeaveMapping[]>(this.rooturl+'/EmployeeLeaveMapping')
      .pipe(
        tap(data => console.log(JSON.stringify(data))),
        catchError(this.handleError)
      );

  }
  /*getLeaves():Observable<EmployeeLeaveMapping[]>{
    return this.http.get<EmployeeLeaveMapping[]>(this.rooturl+'/Employ')
      .pipe(
        tap(data => console.log(JSON.stringify(data))),
        catchError(this.handleError)
      );
  }*/
  initializeList(){
    return{
      id:0,
      employeeid:0,
      leaveid:0,
      leavestartdate:new Date(),
      leaveenddate:new Date(),
      status:"pending",
      days:0,
      leavetype:''
    }
  }
  private handleError(err) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }
  Convert(arg0: number, arg1: number) {
    return Math.round((arg1-arg0)/86400000)
  }

}
