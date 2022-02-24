import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  username =""
  passWord =""

  constructor(
    private httpClient:HttpClient,
    private router:Router
  ) { }

  ngOnInit(): void {
  }

  sendit(data:any){
    // console.log("Valueasd",data);
    this.onLogin2();
  }

  onLogin2() {
    this.httpClient.post(`${environment.API_URL}/user-profile/save`, { userName: this.username, passWord: this.passWord })
      .subscribe((res: any) => {
        res.userName = this.username;
        res.passWord = this.passWord;
        console.log(res);
        this.router.navigate(['/login']);
        // this.cookie.put('token', res.data.token)
        // this.router.navigate(["/home"])
      })
  }

}
