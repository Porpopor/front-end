import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { async } from '@angular/core/testing';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { withLatestFrom } from 'rxjs';
import { ApiService } from 'src/app/service/api/api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-create-company-work',
  templateUrl: './create-company-work.component.html',
  styleUrls: ['./create-company-work.component.css']
})
export class CreateCompanyWorkComponent implements OnInit {

  id = ""
  CompanyName = ""
  Province = ""
  District = ""
  JobTitle = ""
  Salary = ""
  WelfareBenefits = ""
  DetailWork = ""
  provinceData = []
  districtData = []
  welfareBenefits: any = []
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
    private api: ApiService,
    private dialogRef: MatDialogRef<CreateCompanyWorkComponent>
  ) { }

  ngOnInit(): void {
    console.log(this.getPicture)
    this.onFormdata()
    // this.onImageArray()
    this.onFormWelfareBenefits()
    this.getProvince()
    this.onImageArray()
    // this.getDistrict()
    // console.log(this.getDistrict())
  }

  onFormdata() {
    let form = {
      // name: ""
    }

    this.feature.push(form)
    // console.log(this.feature)
  }

  onFormWelfareBenefits() {
    let form = {
      // name:""
    }
    this.welfareBenefits.push(form)
  }

  // onImageArray() {
  //   let form = {

  //   }
  //   this.imageArray.push(form)
  //   console.log(this.imageArray)
  // }

  deleteWelfareBenefits(index: any) {

    this.welfareBenefits.splice(index, 1)
  }

  deleteFeature(index: any) {

    this.feature.splice(index, 1)
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
    let feature = []
    for (let i of this.feature) {
      feature.push(i.name)
    }
    let welfareBenefits = []
    for (let i of this.welfareBenefits) {
      welfareBenefits.push(i.name)
    }
    console.log(feature)
    let data: any = {
      companyName: this.CompanyName,
      province: this.Province,
      district: this.District,
      jobTitle: this.JobTitle,
      salary: this.Salary,
      welfareBenefits: welfareBenefits,
      detailWork: this.DetailWork,
      feature: feature,
      contact: this.Contact,
    }
    this.api.apiPost("/company-work/create", data)
      .then((res: any) => {
        // console.log(res)
        this.id = res.data.id
        this.uploadimg()
        this.dialogRef.close();
      })
  }

  getProvince() {
    this.api.apiGetWeb2("/v1/thailand/provinces")
      .then((res: any) => {
        // console.log(res)
        this.provinceData = res.data;
        // console.log(this.provinceData)
      })
  }

  getDistrict(event: any) {
    this.api.apiGetWeb2("/v1/thailand/provinces/" + event.target.value + "/district")
      .then((res: any) => {
        // console.log(res)
        this.districtData = res.data;
      })
  }

  onImageArray() {
    let form = {

    }
    this.imageArray.push(form)
    // console.log(this.imageArray)
  }

  deleteImageArray(index: any) {

    this.imageArray.splice(index, 1)
    this.picture.splice(index, 1)
    this.getPicture.splice(index, 1)
    console.log(this.picture)
      console.log(this.getPicture)
  }

  changeImg(event: any, i: any) {
    this.image = <File>event.target.files[0];
    // for (let i = 0; i < this.image.length; i++) {
    const imgRegister = new FileReader();
    imgRegister.readAsDataURL(this.image)
    imgRegister.onload = () => {
      if (this.picture.length == i) {
        this.picture.push(this.image)
        let data = this.getPicture.push(imgRegister.result)
      }
      if (this.picture.length >= i) {
        this.picture[i] = this.image
        this.getPicture[i] = imgRegister.result
      }
      // }
      console.log(this.picture)
      console.log(this.getPicture)
    }
  }

  uploadimg() {
    const fileData = new FormData();
    // console.log(this.picture);
    // console.log(this.picture.length);
    for (let i = 0; i < this.picture.length; i++) {
      fileData.append('files', this.picture[i], this.picture[i].name);
    }
    this.api.apiPost("/file/company-work/" + this.id, fileData)
      .then((res: any) => {
        // console.log(res);
      })
      .catch((error: any) => {
        console.log(error)
      })
  }

}
