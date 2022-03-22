import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { ApiService } from 'src/app/service/api/api.service';
import { environment } from 'src/environments/environment';

declare function myFunction(): any

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  province_text = "";
  name_text = "";
  id: string | undefined;

  role = "";

  companyWorkList = [];
  provinceData = [];

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private cookie: CookieService,
    private activateRoute: ActivatedRoute,
    private api : ApiService
  ) {
  }

  ngOnInit(): void {
    this.getData();
    this.getprovince();
    // if (!this.checkLogin()) {
    //   this.router.navigate(['/login']);
    // }else{
    //   this.checkRole()
    // }
    
  }

  checkLogin() {
    return this.cookie.hasKey('token');
  }

  getData() {
    this.httpClient.post(`${environment.API_URL}/company-work/listAll`, {})
      .subscribe((res: any) => {
        // console.log(res)
        this.companyWorkList = res.data.companyWork;
      })
  }

  getprovince() {
    this.httpClient.get(`${environment.API_URL2}/v1/thailand/provinces`, {})
      .subscribe((res: any) => {
        // console.log(res)
        this.provinceData = res.data;
      })
  }

  getDataSearch() {
    let data:any = {
      province: this.province_text,
      companyName: this.name_text
    }
    this.api.apiPostWeb("/company-work/listAllByProvince",data)
      .then((res: any) => {
        // console.log(res)
        this.companyWorkList = res.data.companyWork;
      })
  }

  getClick(id: any) {
    this.api.apiGetWeb("/company-work/view-byid/" + id)
      .then((res: any) => {
        // console.log(res);
        this.router.navigate([`/view/${id}`],{ relativeTo: this.activateRoute });
      })
  }



}
