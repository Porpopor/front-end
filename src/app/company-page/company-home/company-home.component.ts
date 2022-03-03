import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-company-home',
  templateUrl: './company-home.component.html',
  styleUrls: ['./company-home.component.css']
})
export class CompanyHomeComponent implements OnInit {


  login: boolean = false;

  dashboard: boolean = true;
  addWork: boolean = false;
  id: any;

  role="";

  constructor(
    private activatedRoute: ActivatedRoute,
    private httpClient: HttpClient,
    private cookie: CookieService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
      console.log(this.id);
    })
  }

  checkLogin() {
    return this.cookie.hasKey('token');
  }

  clickdashboard() {
    this.dashboard = true;
    this.addWork = false;
  }

  clickAddwork() {
    this.dashboard = false;
    this.addWork = true;
  }

  checkRoleCompany() {
    this.httpClient.get(`${environment.API_URL}/company/check-role`, {
      headers: { Authorization: `Bearer ${this.cookie.get('token')}` }
    })
      .subscribe((res: any) => {
        console.log(res);
        this.role = res.data.role
        console.log(this.role)
        // if(this.role == "COMPANY"){
        //   this.router.navigate(['/company']);
        // }
      })
  }
  // checkRoleUser() {
  //   this.checkRoleCompany();
  //   this.httpClient.get(`${environment.API_URL}/user/check-role`, {
  //     headers: { Authorization: `Bearer ${this.cookie.get('token')}` }
  //   })
  //     .subscribe((res: any) => {
  //       console.log(res);
  //         this.router.navigate(['/home']);
        
  //     })
  // }

}
