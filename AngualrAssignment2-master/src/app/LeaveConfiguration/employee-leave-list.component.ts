import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../shared/employee.service';
import { LeaveService } from '../shared/leave.service';
import { ApplyLeaveService } from '../shared/apply-leave.service';
import { EmployeeLeaveMapping } from '../shared/apply-leave.model';
import { Leave } from '../shared/leave.model';
import { Employee } from '../shared/employee.model';

@Component({
  selector:'employee-leave-list',
  templateUrl: 'employee-leave-list.component.html'



})
export class EmployeeLeaveListComponent implements OnInit {

  pageTitle:string = 'Leave List';
  leavemappingdetails:EmployeeLeaveMapping[]=[];
  leavemapping:EmployeeLeaveMapping[];
  lmd:EmployeeLeaveMapping[]=[];
  lm:EmployeeLeaveMapping[];
  empleavmap:EmployeeLeaveMapping;
  leaves:Leave;
  leaved:Leave[];
  leaveDetails:Leave[]=[];
  employee:Employee;
  employees:Employee[];
  employeedetails:Employee[]=[];
  days:number;
  _listFilter:string;
  get listFilter():string{
      return this._listFilter;
  }
  set listFilter(value:string){
      this._listFilter=value;
      this.lm=this.listFilter?this.performFilter(this.listFilter):this.lmd;
  }
  performFilter(filterBy: string): EmployeeLeaveMapping[]{
    filterBy=filterBy.toLocaleLowerCase();
    return this.lmd.filter((lmd : EmployeeLeaveMapping) =>
    lmd.employeename.toLocaleLowerCase().indexOf(filterBy) !== -1);

  }
  constructor(private empservice:EmployeeService,private leaveservice:LeaveService,private empleaveervice:ApplyLeaveService){}
  ngOnInit(): void {
    this.empleavmap=this.initializeList();
    this.leaves=this.initializeLeave();
    this.employee=this.initializeEmployee();

    this.empservice.getEmployees().subscribe({
      next: employee => {
        this.employees= employee;
        this.employeedetails = this.employees;
      },
     });
    this.leaveservice.getLeaves().subscribe({
      next: Leave => {
        this.leaved= Leave;
        this.leaveDetails = this.leaved;
      },
     });
    this.empleaveervice.getLeaves().subscribe({
      next: leave => {
        this.leavemapping = leave;
        this.leavemappingdetails = this.leavemapping;
        this.leavemappingdetails = this.leavemapping.filter(l => l.status==='pending');
        this.listretrieved();
      },
     });
  }



  listretrieved(){
    for(var i=0;i<this.leavemappingdetails.length;i++){
      this.leavemappingdetails[i].days =this.empleaveervice.Convert(new Date(this.leavemappingdetails[i].leavestartdate).getTime(),new Date(this.leavemappingdetails[i].leaveenddate).getTime());
    }
    for(var j=0;j<this.leavemappingdetails.length;j++){
      this.leaves = this.leaveDetails.find(l => l.id === this.leavemappingdetails[j].leaveid );
      this.leaves.maximumleavesallowed=(+this.leaves.maximumleavesallowed-this.leavemappingdetails[j].days).toString();
      this.leavemappingdetails[j].leftdays=this.leaves.maximumleavesallowed;

     /* if(this.leaves.maximumleavesallowed<0){
        alert(`you can't apply for leave`)
      }*/
      this.leavemappingdetails[j].leavetype=this.leaves.leavename;
    }
    for(var k=0;k<this.leavemappingdetails.length;k++){
      this.employee=this.employeedetails.find(e =>e.id===this.leavemappingdetails[k].employeeid);
      this.leavemappingdetails[k].employeename=this.employee.name;
    }
  }
  onsave(status:string,id:number){
    this.empleavmap=this.leavemappingdetails.find(a => a.id===id);
    this.empleavmap.status=status;
    this.empleaveervice.putEmployee(this.empleavmap).subscribe(
      res =>{
        //this.resetForm(form);
        alert(`successfully updated`);
       // this.onSaveComplete();
      },
      err=>{
        console.log(err);
      }
    )
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
      leavetype:'',
      employeename:'',
      leftdays:''
    }
  }
  initializeLeave(){
    return{
      id:0,
      leavename:'',
      maximumleavesallowed:''
    }
  }
  initializeEmployee(){
    return{
      id:0,
      name:'',
      dob:'',
      doj:'',
      email:'',
      salary:0
    }
  }
}
