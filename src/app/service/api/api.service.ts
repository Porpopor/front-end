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
  cookieToken: any;

  constructor(
    private httpClient: HttpClient,
    private cookie: CookieService,
    private router: Router
  ) { }

  checkTokenRefresh() {
    if (this.checkToken()) {
      console.log(this.checkToken())
      this.refreshToken();
    }
  }

  checkToken(): boolean {
    let token: any = this.cookie.get('token');
    this.decodeToken = this.helper.isTokenExpired(token)
    return this.decodeToken;
  }

  checkRefreshToken(): boolean {
    this.decodeRefreshToken = this.helper.isTokenExpired( this.cookie.get('refreshToken'));
    return this.decodeRefreshToken;
  }

  async refreshToken() {
    return await this.httpClient.get(`${environment.API_URL}/user/refresh-token`, {
      headers: { Authorization: `Bearer ${this.cookie.get('refreshToken')}` }
    }).toPromise()
      .then((res: any) => {
        console.log(res);
        this.cookie.put('role', res.data.role)
        this.cookie.put('token', res.data.token);
        this.cookie.put('refreshToken', res.data.refreshToken);
        // window.location.reload();
      })
      .catch((error:any) =>{
        console.log(error.status)
        if(error.status == 403){
          this.cookie.removeAll()
          this.router.navigate(['/login'])
        }
      })
  }

  getCookie() {
    // return this.cookie.hasKey('token')
    return this.cookie.get('token');
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
      headers: { Authorization: `Bearer ` + this.cookie.get('token') }
    }

    let test = this.httpClient.get(`${environment.API_URL + url}`, headers)
      .toPromise().catch((res: any) => {
        console.log(res)
      })
    return test;
  }

  async apiGet(url: any) {
    if (this.checkToken()) await this.refreshToken();
    const token = await this.getCookie()
    const headers = await {
      headers: { Authorization: `Bearer ` + token }
    }

    return await this.httpClient.get<any>(`${environment.API_URL + url}`, headers)
      .toPromise()
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
