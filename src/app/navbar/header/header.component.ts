import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  email = "";
  picture = "";
  verifyEmail: any;
  pathPicture = "http://localhost:8080/uploads/image/profile/";

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private cookie: CookieService) { }
  login: boolean = false;
  verify: boolean = true;
  ngOnInit(): void {
    if (this.checkLogin()) {
      this.login = true;
      this.getProfile();
    } else {
      this.login = false;
    }
  }

  logout(): void {
    this.cookie.remove('token');
    this.router.navigate(['/login']);
  }

  checkLogin() {
    return this.cookie.hasKey('token');
  }

  getProfile() {
    this.httpClient.get(`${environment.API_URL}/user/profile`, {
      headers: { Authorization: `Bearer ${this.cookie.get('token')}` }
    })
      .subscribe((res: any) => {
        this.picture = this.pathPicture + res.data.data.picture;
        this.verifyEmail = res.data.data.verifyEmail;
        this.email = res.data.data.email;
        if (res.data.data.verifyEmail == 0) {
          this.verify = false;
        }
      })
  }
}
