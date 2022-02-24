import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.css']
})
export class ForgetpasswordComponent implements OnInit {

  email ="";
  constructor(
    private httpClient:HttpClient,
    private cookie:CookieService
  ) { }

  ngOnInit(): void {
  }

  onClick(){
    this.httpClient.post(`${environment.API_URL}/sentEmail/forget-password`, {email:this.email})
    .subscribe((res:any)=> {
      console.log(res);
    })
  }

}
