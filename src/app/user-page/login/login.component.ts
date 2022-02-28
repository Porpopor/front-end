import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email = ""
  passWord = ""

  username =""


changeLogin:boolean = true;
changeLogin2:boolean = false;
constructor(private httpClient: HttpClient,
  private cookie: CookieService,
  private router: Router) { }

ngOnInit(): void {
}

onLogin() {
  this.httpClient.post(`${environment.API_URL}/user/login`, { email: this.email, passWord: this.passWord })
    .subscribe((res: any) => {
      console.log(res)
      this.cookie.put('token', res.data.token)
      this.router.navigate(["/home"])
    }, (error: any) => {
      if (error.error.message == "Login.fail")
        console.log("Login.fail");
    })
}

sendit(data:any){
  // console.log("Valueasd",data);
  this.onLogin();
}

onChangeLogin(){
    this.changeLogin = true;
    this.changeLogin2 = false;
    console.log(this.changeLogin);
}
onChangeLogin2(){
  this.changeLogin = false;
  this.changeLogin2 = true;
  console.log(this.changeLogin);
}

}
