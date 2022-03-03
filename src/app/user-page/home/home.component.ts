import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
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
    private activateRoute: ActivatedRoute
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
<<<<<<< HEAD
    return this.cookie.hasKey('token')
    // return localStorage.getItem('token');
=======
    return this.cookie.hasKey('token');
  }

  checkRole() {
    this.httpClient.get(`${environment.API_URL}/user/check-role`,{
      headers: { Authorization: `Bearer ${this.cookie.get('token')}` }
    })
      .subscribe((res: any) => {
        // console.log(res);
        this.role = res.data.role;
        console.log(this.role)
      })
>>>>>>> parent of 454a37d (edit)
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
    this.httpClient.post(`${environment.API_URL}/company-work/listAllByProvince`, { province: this.province_text, name: this.name_text })
      .subscribe((res: any) => {
        // console.log(res)
        this.companyWorkList = res.data.companyWork;
      })
  }

  getClick(id: any) {
    this.httpClient.post(`${environment.API_URL}/company-work/view-byid`, { id })
      .subscribe((res: any) => {
        // console.log(res);
        this.router.navigate([`/view/${id}`],{ relativeTo: this.activateRoute });
      })
  }



}
