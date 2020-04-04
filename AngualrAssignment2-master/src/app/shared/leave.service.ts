import { Injectable } from '@angular/core';
import { Leave } from '../shared/leave.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { throwError, Observable, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { EmployeeLeaveMapping } from './apply-leave.model';
@Injectable({
  providedIn: 'root'
})

export class LeaveService {
  leaves:Leave;
  readonly rootUrl='http://localhost:5594/api';

  constructor(private http:HttpClient){}

  postLeave(leaves:Leave){
    return this.http.post(this.rootUrl+'/Leave',leaves);
   }
   putLeave(leaves:Leave){
    return this.http.put(this.rootUrl+'/Leave/'+leaves.id,leaves);
   }
   deleteLeave(id){
     return this.http.delete(this.rootUrl+'/Leave/'+id)
   }
   getLeaves():Observable<Leave[]>{
    return this.http.get<Leave[]>(this.rootUrl+'/Leave')
      .pipe(
        tap(data => console.log(JSON.stringify(data))),
        catchError(this.handleError)
      );
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

  getLeave(id: number): Observable<Leave> {
    if (id === 0) {
      return of(this.initializeLeave());
    }
    const url = `${this.rootUrl+'/Leave'}/${id}`;
    return this.http.get<Leave>(url)
      .pipe(
        tap(data => console.log('getLeave: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }
  public initializeLeave(): Leave {
    // Return an initialized object
    return {
      id:0,
    leavename:'',
    maximumleavesallowed:'',

    }
  }
  DateToDays(arg0: number, arg1: number) {
    return Math.round((arg1-arg0)/86400000)
  }
  createEmployeeLeave(employeeLeave: EmployeeLeaveMapping): Observable<EmployeeLeaveMapping> {
   // const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<EmployeeLeaveMapping>(this.rootUrl+'/EmployeeLeaveMapping', employeeLeave)
      .pipe(
        catchError(this.handleError)
      );
  }
}
