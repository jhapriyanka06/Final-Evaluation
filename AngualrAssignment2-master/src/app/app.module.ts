import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { RouterModule} from '@angular/router';

//declarations
import { AppComponent } from './app.component';
import { WelcomeComponent } from './Welcome.component';
import { AdminLoginComponent } from './AdminLogin/admin-login.component';
import { EmployeeComponent } from './employee/employee.component';
import { EmployeeDetailsComponent } from './employee/employee-details.component';
import { LeaveConfigComponent } from './LeaveConfiguration/leave-config.component';
import { LeaveListComponent } from './LeaveConfiguration/leave-list.component';

//providers
import { EmployeeService } from './shared/employee.service';
import { LeaveService } from './shared/leave.service';
import { EmployeeLoginComponent } from './employeelogin/employee-login.component';







@NgModule({


  declarations: [
    AppComponent,
   WelcomeComponent,
   AdminLoginComponent,
   EmployeeComponent,
   EmployeeDetailsComponent,
   LeaveConfigComponent,
   LeaveListComponent,
   EmployeeLoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
   RouterModule.forRoot([
     {path:'welcome', component:WelcomeComponent},
     {path:'adminlogin', component:AdminLoginComponent},
     {path:'employeeadd/:id/edit', component:EmployeeComponent},
     {path:'employeedetails', component:EmployeeDetailsComponent},
     {path:'LeaveConfiguration/:id/edit', component:LeaveConfigComponent},
     {path:'LeaveListComponent', component:LeaveListComponent},
     {path:'employeelogin', component:EmployeeLoginComponent},
     {path:'', redirectTo:'welcome', pathMatch:'full'}
   ])
  ],
  providers: [EmployeeService,
  LeaveService],
  bootstrap: [AppComponent]
})
export class AppModule { }
