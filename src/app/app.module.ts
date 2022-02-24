import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './navbar/header/header.component';
import { HomeComponent } from './user-page/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CookieModule } from 'ngx-cookie';
import { LoginComponent } from './user-page/login/login.component';
import { ProfileComponent } from './user-page/profile/profile.component';
import { RegisterComponent } from './user-page/register/register.component';
import { ForgetpasswordComponent } from './user-page/forgetpassword/forgetpassword.component';
import { ViewCompanyworkComponent } from './user-page/view-companywork/view-companywork.component';
import { ResetpasswordComponent } from './user-page/resetpassword/resetpassword.component';
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
    ResetpasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CookieModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
