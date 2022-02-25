import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  check: boolean = false;

  id: String | undefined;

  constructor(
    private httpClient: HttpClient,
    private cookie: CookieService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {

  }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
      console.log(this.id);
    })
  }

  onClick() {
    this.httpClient.post(`${environment.API_URL}/user/reset-password`, { newPassWord: this.resetPassword, confirmPassWord: this.confirmPassword }, {
      headers: { Authorization: `Bearer ${this.id}` }
    })
      .subscribe((res: any) => {
        console.log(res);
        if (res.message == "ResetPassword Success") {
          this.check = true;
          // this.router.navigate(['/login']);
          console.log(this.check);
        }
      }, (error: any) => {
        if (error.error.message == "password.old.incorrect")
          console.log("Reset.fail");
      })
  }

}
