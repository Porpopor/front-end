import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm = new FormGroup({

    emailForm: new FormControl('', [Validators.required, Validators.email]),
    firstnameForm: new FormControl('', Validators.required),
    lastnameForm: new FormControl('', Validators.required),
    passwordForm: new FormControl('', Validators.required),
    sexForm: new FormControl('', Validators.required),
    phoneForm: new FormControl('', [Validators.required,Validators.pattern('[- +()0-9]+')])

  })

  registerCompanyForm = new FormGroup({

    email: new FormControl('', [Validators.required, Validators.email]),
    companyName: new FormControl('', Validators.required),
    passWord: new FormControl('', Validators.required),
    type: new FormControl('', Validators.required),
    phone: new FormControl('', [Validators.required,Validators.pattern('[- +()0-9]+')])

  })

  id = ""
  ttt: any;
  imm: any;

  click: boolean = false;
  click2: boolean = false;
  clickChangeRegister: boolean = false;

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.imm = "assets/images/login/user.png";

    this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
      console.log(this.id);
    })
    if (this.id == "company") {
      this.click = true;
      this.click2 = true;
      this.clickChangeRegister = true;
    }
  }

  //User
  get email() {
    return this.registerForm.get('emailForm');
  }
  get firstname() {
    return this.registerForm.get('firstnameForm');
  }
  get lastname() {
    return this.registerForm.get('lastnameForm');
  }
  get password() {
    return this.registerForm.get('passwordForm');
  }
  get sex() {
    return this.registerForm.get('sexForm');
  }
  get phone() {
    return this.registerForm.get('phoneForm');
  }

  //Company
  get email2() {
    return this.registerCompanyForm.get('email');
  }
  get companyName() {
    return this.registerCompanyForm.get('companyName');
  }
  get password2() {
    return this.registerCompanyForm.get('passWord');
  }
  get type() {
    return this.registerCompanyForm.get('type');
  }
  get phone2() {
    return this.registerCompanyForm.get('phone');
  }

  sendit(data: any) {
    // console.log("Valueasd",data);
    // this.onLogin2();
  }

  changeRegister() {
    this.clickChangeRegister = true;
    this.click = true;
    this.click2 = true;
  }

  changeRegister2() {
    this.clickChangeRegister = false;
    this.click = false;
    this.click2 = false;
  }

  changeImg(event: any) {
    this.ttt = <File>event.target.files[0];
    const imgRegister = new FileReader();
    imgRegister.readAsDataURL(this.ttt);
    imgRegister.onload = () => {
      this.imm = imgRegister.result
    }
  }

  onupload(){

  }

  onRegister() {
    console.log(this.registerForm.value);
    this.httpClient.post(`${environment.API_URL}/user/register`,
      {
        email: this.email?.value,
        passWord: this.password?.value,
        firstName: this.firstname?.value,
        lastName: this.lastname?.value,
        sex: this.sex?.value,
        phone: this.phone?.value

      })
      .subscribe((res: any) => {
        console.log(res);
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })

        Toast.fire({
          icon: 'success',
          title: 'สมัครสมาชิกสำเร็จ',
          width: 260

        })
        this.router.navigate(['/login']);
        // this.cookie.put('token', res.data.token)
        // this.router.navigate(["/home"])
      }, (error: any) => {
        console.log(error.error.message);
        Swal.fire({
          icon: 'error',
          title: 'Email นี้มีผู้ใช้งานแล้ว',
          confirmButtonText: 'ตกลง',
          confirmButtonColor: '#2e6edf'
        })
      })
  }
  onRegister2(){
    this.httpClient.post(`${environment.API_URL}/company/register`,
      {
        email: this.email2?.value,
        companyName: this.companyName?.value,
        passWord: this.password2?.value,
        phone: this.phone2?.value,
        type: this.type?.value,

      })
      .subscribe((res: any) => {
        console.log(res);
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })

        Toast.fire({
          icon: 'success',
          title: 'สมัครสมาชิกสำเร็จ',
          width: 260

        })
        this.router.navigate(['/login/company']);
        // this.cookie.put('token', res.data.token)
        // this.router.navigate(["/home"])
      }, (error: any) => {
        console.log(error.error.message);
        Swal.fire({
          icon: 'error',
          title: 'Email นี้มีผู้ใช้งานแล้ว',
          confirmButtonText: 'ตกลง',
          confirmButtonColor: '#2e6edf'
        })
      })
  }

}