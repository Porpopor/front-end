import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { ApiService } from 'src/app/service/api/api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-company-navbar',
  templateUrl: './company-navbar.component.html',
  styleUrls: ['./company-navbar.component.css']
})
export class CompanyNavbarComponent implements OnInit {

  email =""
  picture = "";
  constructor(
    private cookie: CookieService,
    private router: Router,
    private httpClient: HttpClient,
    private api :ApiService
  ) { }

  ngOnInit(): void {
    this.getProfile()
  }

  logout(): void {
    this.router.navigate(['/login']);
<<<<<<< HEAD
    localStorage.removeItem('role');
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
=======
>>>>>>> parent of 454a37d (edit)
  }

  checkLogin() {
    return localStorage.getItem('token');
  }

  getProfile() {
    this.api.apiGet("/company/profile")
      .then((res: any) => {
        // console.log(res);
        this.picture = res.data.profile.picture;
        this.email = res.data.profile.email;
      })
  }
}
