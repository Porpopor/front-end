import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { withLatestFrom } from 'rxjs';
import { ApiService } from 'src/app/service/api/api.service';

@Component({
  selector: 'app-create-company-work',
  templateUrl: './create-company-work.component.html',
  styleUrls: ['./create-company-work.component.css']
})
export class CreateCompanyWorkComponent implements OnInit {

  CompanyName = ""
  Province = ""
  District = ""
  JobTitle = ""
  Salary = ""
  WelfareBenefits = ""
  DetailWork = ""
  feature: any = []
  // feature =""
  str: any
  Contact = ""

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private activatedRoute: ActivatedRoute,
    private httpClient: HttpClient,
    private cookie: CookieService,
    private router: Router,
    private api: ApiService
  ) { }

  ngOnInit(): void {
    this.onFormdata()
  }

  onFormdata() {
    let form = {
      // name: ""
    }

    this.feature.push(form)
    console.log(this.feature)
  }

  testSubmit(){

    let a = []
    for(let i of this.feature){
      a.push(i.name)
    }
    console.log(a)
    this.api.apiPostWeb("/test/add",a)
    .then((res:any) =>{
      console.log((res.test).substring(1,res.test.length-1))
      const a = (res.test).substring(1,res.test.length-1).split(',')
      console.log(a)
    })
  }


  onSubmit() {
    let a = []
    for(let i of this.feature){
      a.push(i.name)
    }
    console.log(a)
    let data: any = {
      companyName: this.CompanyName,
      province: this.Province,
      district: this.District,
      jobTitle: this.JobTitle,
      salary: this.Salary,
      welfareBenefits: this.WelfareBenefits,
      detailWork: this.DetailWork,
      feature: a,
      contact: this.Contact,
    }
    this.api.apiPost("/company-work/create", data)
      .then((res: any) => {
        console.log(res)
      })
  }

}
