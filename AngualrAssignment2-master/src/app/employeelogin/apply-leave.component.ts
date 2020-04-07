import { Component, OnInit } from '@angular/core';
import { Leave } from '../shared/leave.model';
import { EmployeeLeaveMapping } from '../shared/apply-leave.model';
import { LeaveService } from '../shared/leave.service';
import { EmployeeService } from '../shared/employee.service';
import { Router, ActivatedRoute } from '@angular/router';
import {NgForm} from '@angular/forms';
import { ApplyLeaveService } from '../shared/apply-leave.service';

@Component({
  selector:'apply-leave',
  templateUrl: 'apply-leave.component.html'
})
export class ApplyLeaveComponent implements OnInit {

  pageTitle:string = 'Leave List';
  leave:Leave[];
  leaveDetails:Leave[]=[];
  applyleave:EmployeeLeaveMapping;
  days:number;
  leavename:string='';
  leaves:Leave ;
  leaves_t:Leave;
  empId:number;
  lid:number;
  leavemappingdetails:EmployeeLeaveMapping[]=[];
  leavemapping:EmployeeLeaveMapping[];
  constructor(private service:LeaveService,private services:EmployeeService,
              private router:Router,private route:ActivatedRoute,private Leaveservice:ApplyLeaveService){}

    ngOnInit(): void {
    this.applyleave=this.initializeLeave();
    this.leaves=this.initialize();
    const ID=+this.route.snapshot.paramMap.get('id');
    this.applyleave.employeeid=ID;
    this.empId=ID;
    this.service.getLeaves().subscribe({
    next: leave => {
      this.leave = leave;
      this.leaveDetails = this.leave;
    },
   });

   this.Leaveservice.getLeaves().subscribe({
    next: leave => {
      this.leavemapping = leave;
      this.leavemappingdetails = this.leavemapping.filter(l => l.employeeid===ID);
    },
   });
}
left:number;
  onSave(form:NgForm){
   if(this.leavemappingdetails.length==0){
   this.days =this.service.Convert(new Date(form.value.leavestartdate).getTime(),new Date(form.value.leaveenddate).getTime());
      this.leaves = this.leaveDetails.find(l => l.leavename === form.value.leavename);
      if(this.days > 0 && this.days <= +this.leaves.maximumleavesallowed)
      {
          this.applyleave.leaveid = this.leaves.id;
          this.applyleave.leavestartdate=form.value.leavestartdate;
          this.applyleave.leaveenddate=form.value.leaveenddate;
          this.service.createEmployeeLeave(this.applyleave).subscribe( res =>{
            alert(`Leave Added Successfully`);
            this.lid=res.id;
            this.onSaveComplete();
          },
          err=>{
            console.log(err);
          }
          )
        }
        else if(this.left==0){
          alert(`You Cannot Apply For Any More ${form.value.leavename}`);
          alert(`please refresh the page before applying for another leave`);
        }
        else{
          alert(`You Can Apply For ${this.left} days ${form.value.leavename} only`);
          alert(`please refresh the page before applying for another leave`);
        }
  }
  else{
    for(var i=0;i<this.leavemappingdetails.length;i++){
      this.leavemappingdetails[i].days =this.service.Convert(new Date(this.leavemappingdetails[i].leavestartdate).getTime(),new Date(this.leavemappingdetails[i].leaveenddate).getTime());
    }
    for(var j=0;j<this.leavemappingdetails.length;j++){
      this.leaves = this.leaveDetails.find(l => l.id === this.leavemappingdetails[j].leaveid );
      if(this.leaves.leavename==form.value.leavename){
        this.leaves.maximumleavesallowed=(+this.leaves.maximumleavesallowed-this.leavemappingdetails[j].days).toString();
        this.left=+this.leaves.maximumleavesallowed;
      }
   }
   this.days =this.service.Convert(new Date(form.value.leavestartdate).getTime(),new Date(form.value.leaveenddate).getTime());
      this.leaves = this.leaveDetails.find(l => l.leavename === form.value.leavename);
      if(this.days > 0 && this.days <= +this.left)
      {

          this.applyleave.leaveid = this.leaves.id;
          this.applyleave.leavestartdate=form.value.leavestartdate;
          this.applyleave.leaveenddate=form.value.leaveenddate;
          this.service.createEmployeeLeave(this.applyleave).subscribe( res =>{
            alert(`successful`);
            this.lid=res.id;
            this.onSaveComplete();
          },
          err=>{
            console.log(err);
          }
          )
        }
        else if(this.left==0){
          alert(`You Cannot Apply For Any More ${form.value.leavename}`);
          alert(`please refresh the page before applying for another leave`);
        }
        else{
          alert(`You Can Apply For ${this.left} days ${form.value.leavename} only`);
          alert(`please refresh the page before applying for another leave`);
        }
       }
    }
private initialize():Leave{
  return{
    id: 0,
    leavename:'',
    maximumleavesallowed: ''
  }
}

 private initializeLeave():EmployeeLeaveMapping{
    return{
      id:0,
      employeeid:0,
      leaveid:0,
      leavestartdate:new Date(),
      leaveenddate:new Date(),
      status:"pending",
      days:0,
      leavetype:'',
      employeename:'',
      leftdays:''
    }
  }
onSaveComplete(message?: string): void {
  this.router.navigate(['/employeeleavelist',this.empId]);
}
}
