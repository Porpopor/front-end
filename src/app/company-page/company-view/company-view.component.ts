import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { ApiService } from 'src/app/service/api/api.service';

@Component({
  selector: 'app-company-view',
  templateUrl: './company-view.component.html',
  styleUrls: ['./company-view.component.css']
})
export class CompanyViewComponent implements OnInit {

  id: any
  data:any = []
  constructor(
    private activatedRoute: ActivatedRoute,
    private httpClient: HttpClient,
    private cookie: CookieService,
    private dialog: MatDialog,
    private api: ApiService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
      console.log(this.id);
      // console.log(this.verify);s
    })
    this.getCompanyWork()
  }

  getCompanyWork() {
    this.api.apiGetWeb("/company-work/view-byid/" + this.id)
      .then((res: any) => {
        console.log(res)
        this.data = res.data.data
        console.log(this.data)
      })
  }

}
