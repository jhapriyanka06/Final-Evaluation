import { Component, OnInit } from '@angular/core';
import { Leave } from '../shared/leave.model';
import { LeaveService } from '../shared/leave.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeLeaveMapping } from '../shared/apply-leave.model';
import { ApplyLeaveService } from '../shared/apply-leave.service';

@Component({
  selector:'leave-list',
  templateUrl: 'leave-list.component.html'



})
export class LeaveListComponent implements OnInit {
  pageTitle:string = 'Leave Add';
  leave:Leave[];
  leaveDetails:Leave[]=[];
  leavemappingdetails:EmployeeLeaveMapping[]=[];
  leavemapping:EmployeeLeaveMapping[];
  empleavmap:EmployeeLeaveMapping;
  constructor(private services:LeaveService,private router:Router,private route:ActivatedRoute,private empleaveervice:ApplyLeaveService){}

  ngOnInit(): void {
    this.services.getLeaves().subscribe({
      next: leave => {
        this.leave = leave;
        this.leaveDetails = this.leave;
      },
     });
  }
  DeleteLeave(id){
    if (confirm(`Really delete the leave?`)) {
    this.services.deleteLeave(id).subscribe(
      res =>{
        this.onSaveComplete();
        this.DeletingFromLeave(id);
      },
      err=>{
        console.log(err);
      }
    )
  }
  }
  DeletingFromLeave(id:number){
    this.empleaveervice.getLeaves().subscribe({
      next: leave => {
        this.leavemapping = leave;
        this.leavemappingdetails = this.leavemapping;
        this.leavemappingdetails = this.leavemapping.filter(l => l.leaveid===id);
        this.DeleteE();
        },
     });

  }
  ID:number;
  DeleteE(){
    for(var i=0;i<this.leavemappingdetails.length;i++){
      this.ID=this.leavemappingdetails[i].id;
      this.empleaveervice.deleteEmployee(this.ID).subscribe(
        res =>{
        this.onSaveComplete();
        },
        err=>{
          console.log(err);
        }
      )
     }
  }
  onSaveComplete(): void {
    this.services.getLeaves().subscribe({
      next: leave => {
        this.leave = leave;
        this.leaveDetails = this.leave;
      },
     });
    //this.router.navigate(['/employeedetails']);
   }
}
