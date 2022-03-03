import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
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
    private httpClient: HttpClient
  ) { }

  ngOnInit(): void {
    this.getProfile()
  }

  logout(): void {
    this.cookie.remove('token');
    this.router.navigate(['/login']);
    localStorage.removeItem('role');
  }

  checkLogin() {
    return this.cookie.hasKey('token');
  }

  getProfile() {
    this.httpClient.get(`${environment.API_URL}/company/profile`, {
      headers: { Authorization: `Bearer ${this.cookie.get('token')}` }
    })
      .subscribe((res: any) => {
        console.log(res);
        this.picture = res.data.profile.picture;
        this.email = res.data.profile.email;
      })
  }
}
