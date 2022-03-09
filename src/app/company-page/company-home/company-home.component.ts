import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CookieService } from 'ngx-cookie';

@Component({
  selector: 'app-company-home',
  templateUrl: './company-home.component.html',
  styleUrls: ['./company-home.component.css']
})
export class CompanyHomeComponent implements OnInit {

  id: any;

  helper = new JwtHelperService();
  decodeToken : any
  role="";


  constructor(
    private activatedRoute: ActivatedRoute,
    private httpClient: HttpClient,
    private cookie: CookieService,
    private router: Router
  ) { }

  ngOnInit(): void {

    // this.id = localStorage.getItem('token');
    // this.decodeToken = this.helper.isTokenExpired(this.id)
    // console.log(this.decodeToken)

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
