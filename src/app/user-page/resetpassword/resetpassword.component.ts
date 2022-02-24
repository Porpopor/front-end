import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {
  resetPassword = "";
  confirmPassword = "";
  param: any;
  constructor(
    private httpClient: HttpClient,
    private cookie: CookieService,
    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe((res:any)=> {
      this.param = res;
    })

  }
  ngOnInit(): void {
  }

  onClick() {
    this.httpClient.post(`${environment.API_URL}/user/reset-password`, { newPassWord: this.resetPassword, confirmPassWord: this.confirmPassword }, {
      headers: { Authorization: `Bearer ${this.param.id}` }
    })
      .subscribe((res: any) => {
        console.log(res);
      }, (error: any) => {
        if (error.error.message == "password.old.incorrect")
          console.log("Login.fail");
      })
  }

}
