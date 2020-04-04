import { Component, OnInit } from '@angular/core';
import { Leave } from '../shared/leave.model';
import { EmployeeLeaveMapping } from '../shared/apply-leave.model';
import { LeaveService } from '../shared/leave.service';
import { EmployeeService } from '../shared/employee.service';
import { Router } from '@angular/router';
import {NgForm} from '@angular/forms';

@Component({
  selector:'apply-leave',
  templateUrl: 'apply-leave.component.html'
})
export class ApplyLeaveComponent implements OnInit {

  pageTitle:string = 'Leave List';
  leave:Leave[];
  leaveDetails:Leave[]=[];
  applyleave:EmployeeLeaveMapping;
  Days:number;
  leavename:string='';
  leaves:Leave ;

  constructor(private service:LeaveService,private services:EmployeeService,
              private router:Router){}
  
    ngOnInit(): void {
    this.applyleave=this.initializeLeave();
    this.leaves=this.initialize();
    this.service.getLeaves().subscribe({
    next: leave => {
      this.leave = leave;
      this.leaveDetails = this.leave;
    },
   });
}
private initialize():Leave{
  return{
    id: 0,
    leavename:'',
    maximumleavesallowed: '2'
  }
}

 private initializeLeave():EmployeeLeaveMapping{
    return{
      id:0,
      employeeid:0,
      leaveid:0,
      leavestartdate:new Date(),
      leaveenddate:new Date(),
      status:"pending"
    }
  }
  onSave(form:NgForm){
    
    this.Days =this.service.DateToDays(new Date(form.value.leavestartdate).getTime(),new Date(form.value.leaveenddate).getTime())
    if(form.value.leavestartdate && form.value.leaveenddate)
    {
      this.leaves = this.leaveDetails.find(a => a.leavename === form.value.leavename);
      if(this.Days > 0 && this.Days <= +this.leaves.maximumleavesallowed)
      {
         // this.applyleave.employeeid = this.services.employee.id;
          this.applyleave.leaveid = this.leaves.id;
          this.applyleave.leavestartdate=form.value.leavestartdate;
          this.applyleave.leaveenddate=form.value.leaveenddate;
          this.service.createEmployeeLeave(this.applyleave).subscribe( res =>{
            alert(`successful`);
            this.onSaveComplete();
          },
          err=>{
            console.log(err);
          }
          )

    }
  }
}
onSaveComplete(message?: string): void {
  this.router.navigate(['/myleave']);
}
}
