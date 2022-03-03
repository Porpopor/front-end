import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CookieService } from 'ngx-cookie';
import { ApiService } from 'src/app/service/api/api.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  email = "";
  firstname = "";
  lastname = "";
  phone = "";
  sex = "";
  picture: any;
  pathPicture = "http://localhost:8080/uploads/image/UserProfile/";
  sentEmail = "";
  file: any ="";

  helper = new JwtHelperService();
  decodeToken:any;
  token:any = localStorage.getItem('token');
  TokenRefresh = localStorage.getItem('refreshToken');

  ttt: any = "";
  imm: any;

  // phoneForm = new FormControl('', [Validators.required,Validators.pattern('[- +()0-9]+')])

  verify: boolean = false;
  click: boolean = false;
  constructor(
    private httpClient: HttpClient,
    private cookie: CookieService,
    private router: Router,
    private api:ApiService
  ) { }
  ngOnInit(): void {
   this.api.checkTokenRefresh();
    if (!this.checkLogin()) {
      this.router.navigate(['/login']);
    } else {
      this.getProfile();
    }
  }

  checkLogin() {
    return this.cookie.hasKey('token');
    // return localStorage.getItem('token');
  }

  changeImg(event: any) {
    this.ttt = <File>event.target.files[0];
    const imgRegister = new FileReader();
    imgRegister.readAsDataURL(this.ttt);
    imgRegister.onload = () => {
      this.picture = imgRegister.result
    }
  }

  getProfile() {
    this.httpClient.get(`${environment.API_URL}/user/profile`, {
      headers: { Authorization: `Bearer ${this.cookie.hasKey('token')}` }
    })
      .subscribe((res: any) => {
        // console.log(res)
        this.email = res.data.data.email;
        this.firstname = res.data.data.firstName;
        this.lastname = res.data.data.lastName;
        this.sex = res.data.data.sex;
        this.phone = res.data.data.phone;
        this.picture = res.data.data.picture;
        if(this.picture == null){
          this.picture = "assets/images/login/user.png";
        }
        if (res.data.data.verifyEmail == 1) {
          this.verify = true;
        }
        // console.log(this.picture)
      })
  }

  onSubmit() {
    
    let data = {
      firstName: this.firstname,
      lastName: this.lastname,
      sex: this.sex,
      phone: this.phone
    }
    this.api.apiPut("/user/editUser", data).then((res:any) =>{
      // console.log(res)
      if(!this.ttt){
        // console.log(this.ttt)
      }else{
        this.uploadimg();
      }
    })
  }

  onClick() {
    this.sentEmail = "SentEmail";
    this.click = true;
    this.api.apiGet("/user/sentVerify-email").then((res:any) =>{
      
    })
  }

  uploadimg() {
    const fileData = new FormData();
    fileData.append('fileName', this.ttt ,this.ttt.name);
    this.api.apiPost("/file/image/user-profile", fileData).then((res:any) =>{
      // console.log(res);
    })
  }

  onChangeEmail() {
    let data:any ={
      email : this.email
    }

    this.api.apiPut("/user/change-email",data).then((res:any) =>{
      Swal.fire({
        icon: 'success',
        title: 'ส่ง ยืนยัน แล้ว',
        confirmButtonText: 'ตกลง',
        confirmButtonColor: '#2e6edf'
      })
    },(error:any) =>{
      if(error.error.status == 417){
        Swal.fire({
          icon: 'error',
          title: 'Email นี้ ยืนยันแล้ว',
          confirmButtonText: 'ตกลง',
          confirmButtonColor: '#2e6edf'
        })
      }
    })
    
    // this.httpClient.put(`${environment.API_URL}/user/change-email`, {
    //   email: this.email,
    // }, {
    //   headers: { Authorization: `Bearer ${this.cookie.get('token')}` }
    // })
    //   .subscribe((res: any) => {
    //     console.log(res);
    //   })
  }

}
