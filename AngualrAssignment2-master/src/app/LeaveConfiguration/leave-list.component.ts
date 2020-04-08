import { Component, OnInit } from '@angular/core';
import { Leave } from '../shared/leave.model';
import { LeaveService } from '../shared/leave.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector:'leave-list',
  templateUrl: 'leave-list.component.html'



})
export class LeaveListComponent implements OnInit {
  pageTitle:string = 'Leave Add';
  leave:Leave[];
  leaveDetails:Leave[]=[];

  constructor(private services:LeaveService,private router:Router,private route:ActivatedRoute){}

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
