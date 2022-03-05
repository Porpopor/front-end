import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie';
import { environment } from 'src/environments/environment';
import { DashboardComponent } from '../dialog/dashboard/dashboard.component';
import { EditCompanyWorkComponent } from '../dialog/edit-company-work/edit-company-work.component';
@Component({
  selector: 'app-company-work',
  templateUrl: './company-work.component.html',
  styleUrls: ['./company-work.component.css']
})
export class CompanyWorkComponent implements OnInit {

  data: any = []
  companyWork:any = []

  check: boolean = false;

  constructor(
    private httpClient: HttpClient,
    private cookie: CookieService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {

    this.getCompanyWork()
    this.onFormdata()
  }

  getCompanyWork() {
    this.httpClient.get(`${environment.API_URL}/company-work/list-byCompany`, {
      headers: { Authorization: `Bearer ${this.cookie.get('token')}` }
    })
      .subscribe((res: any) => {
        console.log(res);
        this.companyWork = res.data.list;
      })
  }

  onEdit(id: any) {
    this.dialog.open(EditCompanyWorkComponent, { data: id })
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
