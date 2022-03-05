import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CookieService } from 'ngx-cookie';
import { ApiService } from 'src/app/service/api/api.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email = ""
  passWord = ""
  email2 = ""
  passWord2 = ""

  role = ""

  id = "";

  decodetoken: any

  helper = new JwtHelperService();

  changeLogin: boolean = true;
  changeLogin2: boolean = false;

  constructor(private httpClient: HttpClient,
    private cookie: CookieService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private api: ApiService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
      // console.log(this.id);
    })
  }


  onLogin() {
    this.httpClient.post(`${environment.API_URL}/user/login`, { email: this.email, passWord: this.passWord })
      .subscribe((res: any) => {
        console.log(res)
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 1000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })

        Toast.fire({
          icon: 'success',
          title: 'เข้าสู่ระบบสำเร็จ',
          width: 250

        })
        // localStorage.setItem('role', res.data.role);
        // localStorage.setItem('token', res.data.token);
        // localStorage.setItem('refreshToken', res.data.refreshToken);
        this.cookie.put('role', res.data.role)
        this.cookie.put('token', res.data.token)
        this.cookie.put('refreshToken', res.data.refreshToken)
        this.router.navigate(["/home"])
      }, (error: any) => {
        if (error.error.message == "Login.fail")
          Swal.fire({
            icon: 'error',
            title: 'รหัสผ่านไม่ถูกต้อง',
            confirmButtonText: 'ตกลง',
            confirmButtonColor: '#2e6edf'
          })
      })
  }

  onLogin2() {
    this.httpClient.post(`${environment.API_URL}/company/login`, { email: this.email2, passWord: this.passWord2 })
      .subscribe((res: any) => {
        console.log(res)
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 1000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })

        Toast.fire({
          icon: 'success',
          title: 'เข้าสู่ระบบสำเร็จ',
          width: 250

        })
        // localStorage.setItem('role', res.data.role);
        // localStorage.setItem('token', res.data.token);
        // localStorage.setItem('refreshToken', res.data.refreshToken);
        this.cookie.put('role', res.data.role)
        this.cookie.put('token', res.data.token)
        this.cookie.put('refreshToken', res.data.refreshToken)

        this.decodetoken = this.helper.getTokenExpirationDate(res.data.token)
        console.log(this.decodetoken);

        this.router.navigate(["/company"])
      }, (error: any) => {
        Swal.fire({
          icon: 'error',
          title: 'รหัสผ่านไม่ถูกต้อง',
          confirmButtonText: 'ตกลง',
          confirmButtonColor: '#2e6edf'
        })
      })
  }

  sendit(data: any) {
    // console.log("Valueasd",data);
    this.onLogin();
  }

  onChangeLogin() {
    this.changeLogin = true;
    this.changeLogin2 = false;
    // console.log(this.changeLogin);
  }
  onChangeLogin2() {
    this.changeLogin = false;
    this.changeLogin2 = true;
    // console.log(this.changeLogin);
  }

}
