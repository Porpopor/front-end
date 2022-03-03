import { NgModule, ViewChild } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyDashboardComponent } from './company-page/company-dashboard/company-dashboard.component';
import { CompanyHomeComponent } from './company-page/company-home/company-home.component';
import { CompanyWorkComponent } from './company-page/company-work/company-work.component';
import { GuardCompanyService } from './guard-company.service';
import { GuardService } from './guard.service';
import { HeaderComponent } from './navbar/header/header.component';
import { FindJobComponent } from './user-page/find-job/find-job.component';
import { ForgetpasswordComponent } from './user-page/forgetpassword/forgetpassword.component';
import { HomeComponent } from './user-page/home/home.component';
import { LoginComponent } from './user-page/login/login.component';
import { ProfileComponent } from './user-page/profile/profile.component';
import { RegisterComponent } from './user-page/register/register.component';
import { ResetpasswordComponent } from './user-page/resetpassword/resetpassword.component';
import { VerifyEmailComponent } from './user-page/verify-email/verify-email.component';
import { ViewCompanyworkComponent } from './user-page/view-companywork/view-companywork.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'navbar', component: HeaderComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'login/:id', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'register/:id', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent,canActivate: [GuardService] },
  { path: 'forget-password', component: ForgetpasswordComponent },
  { path: 'view', component: ViewCompanyworkComponent },
  { path: 'view/:id', component: ViewCompanyworkComponent },
  { path: 'reset-password', component: ResetpasswordComponent },
  { path: 'reset-password/:id', component: ResetpasswordComponent },
  { path: 'verify-email', component: VerifyEmailComponent },
  { path: 'verify-email/:id', component: VerifyEmailComponent },
  { path: 'find-job', component: FindJobComponent },
  { path: 'company', component: CompanyHomeComponent,canActivate: [GuardCompanyService] },
  // { path: 'company/:id', component: CompanyHomeComponent },
  { path: 'company-work', component: CompanyWorkComponent },
  { path: 'dash-board', component: CompanyDashboardComponent }



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
