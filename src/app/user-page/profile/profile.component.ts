import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { environment } from 'src/environments/environment';

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
  companyName = "";
  picture = "";
  pathPicture = "http://localhost:8080/uploads/image/profile/";
  sentEmail ="";

  verify: boolean = false;
  click: boolean = false;
  constructor(
    private httpClient: HttpClient,
    private cookie: CookieService,
    private router: Router
  ) { }
  ngOnInit(): void {
    if (!this.checkLogin()) {
      this.router.navigate(['/login']);
    } else {
      this.getProfile();
    }
  }

  checkLogin() {
    return this.cookie.hasKey('token');
  }

  getProfile() {
    this.httpClient.get(`${environment.API_URL}/user/profile`, {
      headers: { Authorization: `Bearer ${this.cookie.get('token')}` }
    })
      .subscribe((res: any) => {
        console.log(res)
        this.email = res.data.data.email;
        this.firstname = res.data.data.firstName;
        this.lastname = res.data.data.lastName;
        this.phone = res.data.data.phone;
        this.companyName = res.data.data.nameCompany;
        this.picture = this.pathPicture + res.data.data.picture;
        if(res.data.data.verifyEmail == 1){
        this.verify = true;
        }
        // console.log(this.picture)
      })
  }

  onClick() {
    this.sentEmail = "SentEmail Success.";
    this.click = true;
    this.httpClient.post(`${environment.API_URL}/sentEmail/verify-email`, { email: this.email }, {
      headers: { Authorization: `Bearer ${this.cookie.get('token')}` }
    })
    .subscribe((res:any)=>{
      console.log(res);
      console.log(this.sentEmail);
    })
  }

}
