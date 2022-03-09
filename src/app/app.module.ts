import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './navbar/header/header.component';
import { HomeComponent } from './user-page/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CookieModule } from 'ngx-cookie';
import { LoginComponent } from './user-page/login/login.component';
import { ProfileComponent } from './user-page/profile/profile.component';
import { RegisterComponent } from './user-page/register/register.component';
import { ForgetpasswordComponent } from './user-page/forgetpassword/forgetpassword.component';
import { ViewCompanyworkComponent } from './user-page/view-companywork/view-companywork.component';
import { ResetpasswordComponent } from './user-page/resetpassword/resetpassword.component';
import { VerifyEmailComponent } from './user-page/verify-email/verify-email.component';
import { FindJobComponent } from './user-page/find-job/find-job.component';
import { FooterComponent } from './navbar/footer/footer.component';
import { CompanyHomeComponent } from './company-page/company-home/company-home.component';
import { CompanyNavbarComponent } from './company-page/company-navbar/company-navbar.component';
import { CompanyWorkComponent } from './company-page/company-work/company-work.component';
import { CompanyDashboardComponent } from './company-page/company-dashboard/company-dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { EditCompanyWorkComponent } from './company-page/dialog/edit-company-work/edit-company-work.component';
import { CreateCompanyWorkComponent } from './company-page/dialog/create-company-work/create-company-work.component';
import { DeleteCompanyWorkComponent } from './company-page/dialog/delete-company-work/delete-company-work.component';
import { CompanyModule } from './company-page/module/company.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    ProfileComponent,
    RegisterComponent,
    ForgetpasswordComponent,
    ViewCompanyworkComponent,
    ResetpasswordComponent,
    VerifyEmailComponent,
    FindJobComponent,
    FooterComponent,
    // CompanyHomeComponent,
    // SidebarComponent,
    // CompanyNavbarComponent,
    // CompanyWorkComponent,
    // CompanyDashboardComponent,
    EditCompanyWorkComponent,
    CreateCompanyWorkComponent,
    DeleteCompanyWorkComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CookieModule.forRoot(),
    BrowserAnimationsModule,
    MatDialogModule,
    ScrollingModule,
    CompanyModule
  ],
  // entryComponents: [
  //   DashboardComponent
  // ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
