import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

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
    phoneForm: new FormControl('', Validators.required)

  })



  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) { }

  ngOnInit(): void {
  }
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


  sendit(data: any) {
    // console.log("Valueasd",data);
    // this.onLogin2();
  }

  onLogin() {
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
        this.router.navigate(['/login']);
        // this.cookie.put('token', res.data.token)
        // this.router.navigate(["/home"])
      },(error: any) => {
          console.log(error.error.message);
      })
  }

}
