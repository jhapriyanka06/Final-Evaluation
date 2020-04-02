import { Component, OnInit } from '@angular/core';
import { Leave } from '../shared/leave.model';
import {LeaveService } from '../shared/leave.service';
import { NgForm } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector:'leave-config',
  templateUrl: 'leave-config.component.html'
})
export class LeaveConfigComponent implements OnInit {
  pageTitle:string = 'Leave Add';
  leave:Leave;
  errorMessage:string;

  constructor(public services:LeaveService,
    private router:Router,
    private route:ActivatedRoute){}

    ngOnInit(): void {
      this.resetForm();
      const id=+this.route.snapshot.paramMap.get('id');
      this.getLeave(id);
    }
    resetForm(form?:NgForm){
      if(form!=null){
      form.resetForm();
      }
      this.services.leaves={
      id:0,
      leavename:'',
      maximumleavesallowed:''
      }
    }

  onSubmitLeave(leave:Leave){
    if(leave.id===0){
      this.insertLeave(leave);
    }

    else{
      this.updateLeave(leave);
    }

  }
  insertLeave(leave:Leave){
    this.services.postLeave(leave).subscribe(
      res =>{
        alert(`Leave Data Successfully Saved`);
        this.onSaveComplete();
      },
      err=>{
        console.log(err);
      }
    )
  }
    updateLeave(leave:Leave){
    this.services.putLeave(leave).subscribe(
      res =>{
        alert(`Leave Data Successfully Updated`);
        this.onSaveComplete();
      },
      err=>{
        console.log(err);
      }
    )
  }
  onSaveComplete(): void {

    this.router.navigate(['/LeaveListComponent']);
   }
   getLeave(id:number):void{
    this.services.getLeave(id).subscribe({
         next:leave  => this.onLeaveRetrieved(leave),
         error:err => this.errorMessage=err
    });
}
  onLeaveRetrieved(leave: Leave): void {
    this.leave = leave;

    if (!this.leave) {
      this.pageTitle = 'No Data found';
    } else {
      if (this.leave.id === 0) {
        this.pageTitle = 'Add Leave';
      } else {
        this.pageTitle = `Edit Leave: ${this.leave.leavename}`;
      }
    }
  }
}
