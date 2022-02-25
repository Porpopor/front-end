import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent implements OnInit {

  id: String | undefined;

  verify: String | undefined;

  login: Boolean = false;
  constructor(
    private activatedRoute: ActivatedRoute,
    private httpClient: HttpClient,

    private cookie: CookieService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
      console.log(this.id);
      console.log(this.verify);
    })
    this.verifyEmail();
    if(this.checkLogin()){
      this.login = true;
    }else{
      this.login = false;
    }
  
  }

  checkLogin() {
    return this.cookie.hasKey('token');
  }

  verifyEmail() {
    this.httpClient.post(`${environment.API_URL}/user/verify-email`, {}, {
      headers: { Authorization: `Bearer ${this.id}` }
    })
      .subscribe((res: any) => {
        console.log(res);
      })
  }

}
