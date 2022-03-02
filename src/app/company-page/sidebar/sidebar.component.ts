import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(
    private cookie: CookieService,
    private router: Router,
    private httpClient: HttpClient
  ) { }

  ngOnInit(): void {
    this.getProfile()
  }


  dashboard(){
    this.router.navigate(['/company/dashboard'])
  }

  logout(): void {
    this.cookie.remove('token');
    this.router.navigate(['/login']);
  }

  checkLogin() {
    return this.cookie.hasKey('token');
  }

  getProfile() {
    this.httpClient.get(`${environment.API_URL}/company/profile`, {
      headers: { Authorization: `Bearer ${this.cookie.get('token')}` }
    })
      .subscribe((res: any) => {
        // console.log(res);
      })
  }


}
