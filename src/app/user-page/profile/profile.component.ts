import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  email ="";
  firstname = "";
  lastname ="";
  phone ="";
  companyName ="";
  picture ="";
  pathPicture="http://localhost:8080/uploads/image/profile/";
  
  constructor(
    private httpClient:HttpClient,
    private cookie:CookieService
    ) { }

  ngOnInit(): void {
    this.getProfile();
  }

  getProfile(){
    this.httpClient.get(`${environment.API_URL}/user/profile`, {
      headers: { Authorization: `Bearer ${this.cookie.get('token')}` }
    })
    .subscribe((res:any)=> {
      console.log(res)
      this.email = res.data.data.email;
      this.firstname = res.data.data.firstName;
      this.lastname = res.data.data.lastName;
      this.phone = res.data.data.phone;
      this.companyName = res.data.data.nameCompany;
      this.picture = this.pathPicture + res.data.data.picture;
      // console.log(this.picture)
    })
  }

}
