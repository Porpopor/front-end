import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { ApiService } from 'src/app/service/api/api.service';

@Component({
  selector: 'app-delete-company-work',
  templateUrl: './delete-company-work.component.html',
  styleUrls: ['./delete-company-work.component.css']
})
export class DeleteCompanyWorkComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private activatedRoute: ActivatedRoute,
    private httpClient: HttpClient,
    private cookie: CookieService,
    private router: Router,
    private api: ApiService,
    private dialogRef: MatDialogRef<DeleteCompanyWorkComponent>
  ) { }

  ngOnInit(): void {
    console.log(this.data)
  }

  onDelete() {
    this.api.apiDelete("/company-work/deleteByCompany", this.data)
      .then((res: any) => {
        console.log(res);
        this.dialogRef.close();
      })
  }

  onClose() {
    this.dialogRef.close();
  }

  getCompanyWork() {
    // this.httpClient.get(`${environment.API_URL}/company-work/list-byCompany`, {
    //   headers: { Authorization: `Bearer ${this.cookie.get('token')}` }
    // })
    this.api.apiGet("/company-work/list-byCompany")
      .then((res: any) => {
        console.log(res);
      })
  }

}
