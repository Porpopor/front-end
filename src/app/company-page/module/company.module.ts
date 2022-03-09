import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyDashboardComponent } from '../company-dashboard/company-dashboard.component';
import { CompanyHomeComponent } from '../company-home/company-home.component';
import { CompanyWorkComponent } from '../company-work/company-work.component';
import { RouterModule } from '@angular/router';
import { CompanyNavbarComponent } from '../company-navbar/company-navbar.component';
import { MatDialogModule } from '@angular/material/dialog';
import {ScrollingModule} from '@angular/cdk/scrolling';
import { CompanyViewComponent } from '../company-view/company-view.component';



@NgModule({
  declarations: [
    CompanyDashboardComponent,
    CompanyHomeComponent,
    CompanyWorkComponent,
    CompanyNavbarComponent,
    CompanyViewComponent

  ],
  imports: [
    CommonModule,
    RouterModule,
    MatDialogModule,
    ScrollingModule
  ]
})
export class CompanyModule { }
