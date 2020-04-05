import { Component, OnInit } from '@angular/core';
import { EmployeeLeaveMapping } from '../shared/apply-leave.model';
import { ActivatedRoute } from '@angular/router';
import { ApplyLeaveService } from '../shared/apply-leave.service';
import { Leave } from '../shared/leave.model';
import { LeaveService } from '../shared/leave.service';

@Component({
  selector:'my-leaves',
  templateUrl: 'myleaves.component.html'
})
export class MyLeavesComponent implements OnInit {

  pageTitle:string = 'My Leaves';
  leavemappingdetails:EmployeeLeaveMapping[]=[];
  leavemapping:EmployeeLeaveMapping[];
  empleavmap:EmployeeLeaveMapping;
  leaves:Leave;
  leaved:Leave[];
  leaveDetails:Leave[]=[];
  days:number;
constructor(private route:ActivatedRoute,private service:ApplyLeaveService,private services:LeaveService){}

  ngOnInit(): void {
    this.empleavmap=this.initializeList();
    this.leaves=this.initialize();
    const id=+this.route.snapshot.paramMap.get('id');

    this.services.getLeaves().subscribe({
      next: Leave => {
        this.leaved= Leave;
        this.leaveDetails = this.leaved;
      },
     });
    this.service.getLeaves().subscribe({
      next: leave => {
        this.leavemapping = leave;
        this.leavemappingdetails = this.leavemapping.filter(l => l.employeeid===id);
        this.LeaveListRetrieved();
      },
     });

  }

LeaveListRetrieved(): void {

  for(var i=0;i<this.leavemappingdetails.length;i++){
    this.leavemappingdetails[i].days =this.services.Convert(new Date(this.leavemappingdetails[i].leavestartdate).getTime(),new Date(this.leavemappingdetails[i].leaveenddate).getTime());
  }
  for(var j=0;j<this.leavemappingdetails.length;j++){
    this.leaves = this.leaveDetails.find(l => l.id === this.leavemappingdetails[j].leaveid );
    this.leaves.maximumleavesallowed=this.leaves.maximumleavesallowed-this.leavemappingdetails[j].days;
    if(this.leaves.maximumleavesallowed<0){
      alert(`you can't apply for leave`)
    }
    this.leavemappingdetails[j].leavetype=this.leaves.leavename;
  }
}

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
  initialize(){
    return{
      id:0,
      leavename:'',
      maximumleavesallowed:0
    }
  }
}
