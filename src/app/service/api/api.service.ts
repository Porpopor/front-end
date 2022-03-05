import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CookieService } from 'ngx-cookie';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  helper = new JwtHelperService();
  decodeToken: any;
  decodeRefreshToken: any;
  role: any = localStorage.getItem('role');
  token: any = localStorage.getItem('token');
  TokenRefresh: any = localStorage.getItem('refreshToken');
  cookieToken: any;

  constructor(
    private httpClient: HttpClient,
    private cookie: CookieService,
    private router: Router
  ) { }

  checkTokenRefresh() {
    // if(this.checkRefreshToken() && this.checkToken() && this.role == "USER"){
    //   localStorage.clear();
    //   this.router.navigate(['/login'])
    // }
    console.log(this.checkToken())
    // console.log(this.role)
    if (this.checkToken()) {
      console.log(this.checkToken())
      this.refreshToken(this.TokenRefresh);
    }
  }

  checkToken(): boolean {
    let token: any = this.token;
    this.decodeToken = this.helper.isTokenExpired(token)
    return this.decodeToken;
  }

  checkRefreshToken(): boolean {
    this.decodeRefreshToken = this.helper.isTokenExpired(this.TokenRefresh);
    return this.decodeRefreshToken;
  }

  refreshToken(data: any) {
    this.httpClient.get(`${environment.API_URL}/user/refresh-token`, {
      headers: { Authorization: `Bearer ${data}` }
    }).subscribe((res: any) => {
      console.log(res);
      this.cookie.put('token', res.data.token)
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('refreshToken', res.data.refreshToken);
      // window.location.reload();
    })
  }

  getCookie() {
    // return this.cookie.hasKey('token')
    return this.cookieToken = this.token;
  }

  async postLogin(url: any, data: any) {
    let token = this.getCookie()

    // let headers = {
    //   headers: { Authorization: `Bearer ` + token }
    // }
    let result1 = await this.httpClient.post(`${environment.API_URL + url}`, data).toPromise()
    // console.log(result1);
    return result1;
  }


  apiPostLogin(url: any, data: any) {

    return new Promise((resolve, rejects) => {
      this.httpClient.post(`${environment.API_URL + url}`, data)
        .subscribe((res: any) => {
          resolve(res);
        }, (error: any) => {
          rejects(error)
        })
    })

  }

  apiPost(url: any, data: any) {
    this.checkTokenRefresh()
    let token = this.getCookie()

    let headers = {
      headers: { Authorization: `Bearer ` + token }
    }

    return new Promise((resolve, rejects) => {
      this.httpClient.post(`${environment.API_URL + url}`, data, headers)
        .subscribe((res: any) => {
          resolve(res);
        }, (error: any) => {
          rejects(error)
        })
    })
  }

   test(url: any) {
    let headers = {
      headers: { Authorization: `Bearer ` + this.token }
    }

    let test = this.httpClient.get(`${environment.API_URL + url}`, headers)
      .toPromise().catch((res: any) => {
        console.log(res)
      })
    return test;
  }

  apiGet(url: any) {
    let token = this.getCookie()
    let headers = {
      headers: { Authorization: `Bearer ` + token }
    }

    return new Promise((resolve, rejects) => {
      this.httpClient.get(`${environment.API_URL + url}`, headers)
        .subscribe((res: any) => {
          resolve(res);
        }, (error: any) => {
          rejects(error)
        })
    })
  }

  apiPut(url: any, data: any) {
    this.checkTokenRefresh()
    let token = this.getCookie()

    let headers = {
      headers: { Authorization: `Bearer ` + token }
    }

    return new Promise((resolve, rejects) => {
      this.httpClient.put(`${environment.API_URL + url}`, data, headers)
        .subscribe((res: any) => {
          resolve(res);
        }, (error: any) => {
          rejects(error)
        })
    })
  }
}
