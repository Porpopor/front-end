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


  dashboard: boolean = true;
  addWork: boolean = false;
  id: any;

<<<<<<< HEAD
  helper = new JwtHelperService();
  decodeToken : any
  role="";

=======
>>>>>>> parent of 454a37d (edit)
  constructor(
    private activatedRoute: ActivatedRoute,
    private httpClient: HttpClient,
    private cookie: CookieService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.id = localStorage.getItem('token');
    this.decodeToken = this.helper.isTokenExpired(this.id)
    console.log(this.decodeToken)

  }
  clickdashboard() {
    this.dashboard = true;
    this.addWork = false;
  }

  clickAddwork() {
    this.dashboard = false;
    this.addWork = true;
  }
<<<<<<< HEAD
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
=======
>>>>>>> parent of 454a37d (edit)

}
