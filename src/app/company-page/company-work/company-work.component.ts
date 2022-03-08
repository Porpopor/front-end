import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie';
import { ApiService } from 'src/app/service/api/api.service';
import { environment } from 'src/environments/environment';
import { CreateCompanyWorkComponent } from '../dialog/create-company-work/create-company-work.component';
import { DashboardComponent } from '../dialog/dashboard/dashboard.component';
import { DeleteCompanyWorkComponent } from '../dialog/delete-company-work/delete-company-work.component';
import { EditCompanyWorkComponent } from '../dialog/edit-company-work/edit-company-work.component';
@Component({
  selector: 'app-company-work',
  templateUrl: './company-work.component.html',
  styleUrls: ['./company-work.component.css']
})
export class CompanyWorkComponent implements OnInit {

  data: any = []
  companyWork: any = []

  check: boolean = false;

  constructor(
    private httpClient: HttpClient,
    private cookie: CookieService,
    private dialog: MatDialog,
    private api: ApiService
  ) { }

  ngOnInit(): void {

    this.getCompanyWork()
    this.onFormdata()
  }

  getCompanyWork() {
    // this.httpClient.get(`${environment.API_URL}/company-work/list-byCompany`, {
    //   headers: { Authorization: `Bearer ${this.cookie.get('token')}` }
    // })
    this.api.apiGet("/company-work/list-byCompany")
      .then((res: any) => {
        console.log(res);
        this.companyWork = res.data.list;
      })
  }
  onCreate() {
    this.dialog.open(CreateCompanyWorkComponent)
  }

  onEdit(id: any) {
    this.dialog.open(EditCompanyWorkComponent, { data: id })
  }

  onDelete(id: any) {
    this.dialog.open(DeleteCompanyWorkComponent, { data: id })
  }


  onFormdata() {
    let form = {
      name: ""
    }

    this.data.push(form)

    console.log(this.data)
  }

  checkButton() {

  }

  test() {
    console.log(this.data)
  }

}
