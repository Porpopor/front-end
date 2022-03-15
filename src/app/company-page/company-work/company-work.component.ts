import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { ApiService } from 'src/app/service/api/api.service';
import { environment } from 'src/environments/environment';
import { CreateCompanyWorkComponent } from '../dialog/create-company-work/create-company-work.component';
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
    private api: ApiService,
    private router: Router,
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
    let dialogRef = this.dialog.open(CreateCompanyWorkComponent, {
      height: '800px',
      width: '800px'
    })
    dialogRef.afterClosed().subscribe((res:any) =>{
      this.getCompanyWork();
    })
  }

  onView(id:any){
    this.router.navigate(['/company/view/' + id])
  }

  onEdit(id: any) {
    this.dialog.open(EditCompanyWorkComponent, { data: id })
  }

  onDelete(id: any) {
    let dialogRef =  this.dialog.open(DeleteCompanyWorkComponent, { data: id })
    dialogRef.afterClosed().subscribe((res:any) =>{
      this.getCompanyWork();
    })
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
