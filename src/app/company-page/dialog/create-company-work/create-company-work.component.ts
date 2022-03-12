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
  image: any
  picture: any = []
  getPicture: any = []
  imageArray: any = []

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
    this.onImageArray()
  }

  onFormdata() {
    let form = {
      // name: ""
    }

    this.feature.push(form)
    console.log(this.feature)
  }

  onImageArray() {
    let form = {

    }
    this.imageArray.push(form)
    console.log(this.imageArray)
  }

  testSubmit() {

    let a = []
    for (let i of this.feature) {
      a.push(i.name)
    }
    console.log(a)
    this.api.apiPostWeb("/test/add", a)
      .then((res: any) => {
        console.log((res.test).substring(1, res.test.length - 1))
        const a = (res.test).substring(1, res.test.length - 1).split(',')
        console.log(a)
      })
  }

  // changeImg(event: any) {
  //   this.image = <File>event.target.files;
  //   for (let i = 0; i < this.image.length; i++) {
  //     const imgRegister = new FileReader();
  //     imgRegister.readAsDataURL(this.image[i])
  //     imgRegister.onload = () => {
  //       this.picture.push(this.image)
  //       this.getPicture.push(imgRegister.result)
  //     }
  //     console.log(this.picture)
  //     console.log(this.getPicture)
  //   }
  // }

  // uploadimg() {
  //   const fileData = new FormData();
  //   console.log(this.picture);
  //   console.log(this.picture.length);
  //   for (let i = 0; i < this.picture.length; i++) {
  //     fileData.append('files', this.picture[i][0], this.picture[i][0].name);
  //   }
  //   this.api.apiPost("/file/test/9", fileData)
  //     .then((res: any) => {
  //       console.log(res);
  //     })
  //     .catch((error: any) => {
  //       console.log(error)
  //     })
  // }


  onSubmit() {
    let a = []
    for (let i of this.feature) {
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
