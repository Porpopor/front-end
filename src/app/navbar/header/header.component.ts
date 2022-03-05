import { HttpClient } from '@angular/common/http';
import { Component, HostBinding, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { ApiService } from 'src/app/service/api/api.service';
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
  pathPicture = "http://localhost:8080/uploads/image/UserProfile/";

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private cookie: CookieService,
    private api: ApiService
  ) { }
  login: boolean = false;
  verify: boolean = true;
  loginComp: boolean = false;
  role: boolean = false;
  ngOnInit(): void {
    if (this.CheckRole()) {
      this.role = true;
      this.getCompanyProfile();
    }
    else if (this.CheckRoleUser()) {
      this.getProfile();
      this.role = false;
    }
    if (this.checkLogin()) {
      this.login = true;
    } else {
      this.login = false;
    }
  }

  @HostBinding('class.header_change') newNav: boolean = false;

  @HostListener('window:scroll')
  onScroll() {
    // console.log(window.scrollY);
    if (window.scrollY >= 10) {
      this.newNav = true;
    } else {
      this.newNav = false;
    }
  }

  logout(): void {
    this.cookie.removeAll();
    this.router.navigate(['/login']);
    // localStorage.removeItem('role');
    // localStorage.removeItem('token');
    // localStorage.clear();
    // window.location.reload();
  }

  checkLogin() {

    // return this.cookie.hasKey('token');
    return this.cookie.hasKey('token');
  }

  getProfile() {
    this.httpClient.get(`${environment.API_URL}/user/profile`, {
      headers: { Authorization: `Bearer ${this.cookie.get('token')}` }
    })
      .subscribe((res: any) => {
        this.picture = res.data.data.picture;
        this.verifyEmail = res.data.data.verifyEmail;
        this.email = res.data.data.email;
        if (res.data.data.verifyEmail == 0) {
          this.verify = false;
        }
      },(error:any) =>{
        console.log(error)
      })
  }

  getCompanyProfile() {
    this.httpClient.get(`${environment.API_URL}/company/profile`, {
      headers: { Authorization: `Bearer ${this.cookie.get('token')}` }
    }).subscribe((res: any) => {
      // console.log(res);
      this.picture = res.data.profile.picture;
      this.email = res.data.profile.email;
    },(error:any) => {

    })
  }

  CheckRole() {
    let role = this.cookie.get('role');
    // console.log(role)
    if (role == "COMPANY") {
      return true;
    } else {
      return false;
    }
  }

  CheckRoleUser() {
    let role = this.cookie.get('role');
    // console.log(role)
    if (role == "USER") {
      return true;
    } else {
      return false;
    }
  }

}
