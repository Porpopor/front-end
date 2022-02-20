import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { environment } from 'src/environments/environment';

declare function myFunction() : any

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  province_text =""
  name_text =""

  companyWorkList = [];
  provinceData =[];

  constructor(private httpClient: HttpClient, private router: Router ,private cookie : CookieService) { }

  ngOnInit(): void {
    this.getData();
    this.getprovince();
  }

  getData(){
    this.httpClient.post(`${environment.API_URL}/company-work/listAll`, {})
    .subscribe((res:any)=> {
      console.log(res)
      this.companyWorkList = res.data.companyWork;
    })
  }

  getprovince(){
    this.httpClient.get(`${environment.API_URL2}/v1/thailand/provinces`, {})
    .subscribe((res:any)=> {
      console.log(res)
      this.provinceData = res.data;
    })
  }

  getDataSearch(){
    this.httpClient.post(`${environment.API_URL}/company-work/listAllByProvince`, {province:this.province_text, name:this.name_text})
    .subscribe((res:any)=> {
      console.log(res)
      this.companyWorkList = res.data.companyWork;
    })
  }

  getClick(id:any){
    console.log(id);
    // this.router.navigate(['/login']);
  }


}
