import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
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

  changeLogin: boolean = true;
  changeLogin2: boolean = false;

  constructor(private httpClient: HttpClient,
    private cookie: CookieService,
    private router: Router,
    private activatedRoute: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
      console.log(this.id);
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
        localStorage.setItem('role', res.profile.role);
        this.cookie.put('token', res.data.token)
        this.checkRole();
        // this.router.navigate(["/home"])
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
        localStorage.setItem('role', res.profile.role);
        this.cookie.put('token', res.data.token)
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
    console.log(this.changeLogin);
  }
  onChangeLogin2() {
    this.changeLogin = false;
    this.changeLogin2 = true;
    console.log(this.changeLogin);
  }

  checkRole() {
    this.httpClient.get(`${environment.API_URL}/user/check-role`,{
      headers: { Authorization: `Bearer ${this.cookie.get('token')}` }
    })
      .subscribe((res: any) => {
        // console.log(res);
        this.role = res.data.role;
        console.log(this.role)
        if(this.role == "USER"){
          this.router.navigate(['/home'])
        }else if(this.role == "ADMIN"){
          this.router.navigate(['/profile'])
        }
      })
  }

}
