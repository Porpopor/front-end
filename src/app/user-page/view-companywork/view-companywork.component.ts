import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { ApiService } from 'src/app/service/api/api.service';

@Component({
  selector: 'app-view-companywork',
  templateUrl: './view-companywork.component.html',
  styleUrls: ['./view-companywork.component.css']
})
export class ViewCompanyworkComponent implements OnInit {

  id: string | undefined;
  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private cookie: CookieService,
    private api : ApiService,
    private activateRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.activateRoute.params.subscribe(params => {
      this.id = params['id'];
      console.log(this.id);
    })
    this.getData()
  }


  getData(){
    this.api.apiGetWeb("/company-work/view-byid/" + this.id)
      .then((res: any) => {
        console.log(res);
      })
  }

}
