import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { ApiService } from 'src/app/service/api/api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit-company-work',
  templateUrl: './edit-company-work.component.html',
  styleUrls: ['./edit-company-work.component.css']
})
export class EditCompanyWorkComponent implements OnInit {


  

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private activatedRoute: ActivatedRoute,
    private httpClient: HttpClient,
    private cookie: CookieService,
    private router: Router,
    private api: ApiService
  ) { }

  ngOnInit(): void {
    this.getData()
  }

  getData() {
    this.httpClient.get(`${environment.API_URL}/company-work/view-byCompany/` + this.data , {
      headers: { Authorization: `Bearer ${this.cookie.get('token')}` }
    })
      .subscribe((res: any) => {
        console.log(res);
      })
  }

  onFormdata() {
    let form = {
      name: ""
    }

    this.data.push(form)

    console.log(this.data)
  }

}
