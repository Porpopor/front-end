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

  async checkTokenRefresh() {
    if (this.checkToken() && this.cookie.get('role') == "USER") {
      console.log(this.checkToken())
      await this.refreshTokenUser();
    }
    if(this.checkToken() && this.cookie.get('role') == "COMPANY"){
      await this.refreshTokenCompany();
    }
  }

  checkToken(): boolean {
    // let token: any = this.cookie.get('token');
    this.decodeToken = this.helper.isTokenExpired(this.cookie.get('token'))
    return this.decodeToken;
  }

  checkRefreshToken(): boolean {
    this.decodeRefreshToken = this.helper.isTokenExpired(this.cookie.get('refreshToken'));
    return this.decodeRefreshToken;
  }

  async refreshTokenUser() {
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
      .catch((error: any) => {
        console.log(error.status)
        if (error.status == 403) {
          this.cookie.removeAll()
          this.router.navigate(['/login'])
        }
      })
  }

  async refreshTokenCompany() {
    return await this.httpClient.get(`${environment.API_URL}/company/refresh-token`, {
      headers: { Authorization: `Bearer ${this.cookie.get('refreshToken')}` }
    }).toPromise()
      .then((res: any) => {
        console.log(res);
        this.cookie.put('role', res.data.role)
        this.cookie.put('token', res.data.token);
        this.cookie.put('refreshToken', res.data.refreshToken);
        // window.location.reload();
      })
      .catch((error: any) => {
        console.log(error.status)
        if (error.status == 403) {
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

  async apiPost(url: any, data: any) {
    await this.checkTokenRefresh();
    const token = await this.getCookie()
    const headers = await {
      headers: { Authorization: `Bearer ` + token }
    }
    return await this.httpClient.post<any>(`${environment.API_URL + url}`, data, headers)
      .toPromise()
  }

  async apiPostWeb(url: any, data: any) {
    return await this.httpClient.post<any>(`${environment.API_URL + url}`, data)
      .toPromise()
  }

  async apiGet(url: any) {
    // if (this.checkToken() && this.cookie.get('role') == "USER") await this.refreshTokenUser();
    await this.checkTokenRefresh();
    const token = await this.getCookie()
    const headers = await {
      headers: { Authorization: `Bearer ` + token }
    }

    return await this.httpClient.get<any>(`${environment.API_URL + url}`, headers)
      .toPromise()
  }

  async apiGetWeb(url: any) {
    if (this.checkToken()) await this.refreshTokenUser();
    const token = await this.getCookie()
    const headers = await {
      headers: { Authorization: `Bearer ` + token }
    }

    return await this.httpClient.get<any>(`${environment.API_URL2 + url}`)
      .toPromise()
  }

  async apiPut(url: any, data: any) {
    await this.checkTokenRefresh();
    const token = await this.getCookie()
    const headers = await {
      headers: { Authorization: `Bearer ` + token }
    }
    return await this.httpClient.put<any>(`${environment.API_URL + url}`,data, headers)
      .toPromise()
  }

  async apiDelete(url:any, data:any){
    await this.checkTokenRefresh();
    const token = await this.getCookie()
    const headers = await {
      headers: { Authorization: `Bearer ` + token }
    }
    return await this.httpClient.delete<any>(`${environment.API_URL + url}/`+ data, headers)
      .toPromise()
  }
}
