import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router : Router, private cookie : CookieService) { }
  login : boolean = false;
  ngOnInit(): void {
    if(this.checkLogin()){
      this.login = true;
    }else{
      this.login = false;
    }
  }

  logout(): void {
    this.cookie.remove('token');
    this.router.navigate(['/login']);
  }

  checkLogin(){
    return this.cookie.hasKey('token');
  }
}
