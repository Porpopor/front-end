import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { ApiService } from 'src/app/service/api/api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit-company-work',
  templateUrl: './edit-company-work.component.html',
  styleUrls: ['./edit-company-work.component.css']
})
export class EditCompanyWorkComponent implements OnInit {

  image: any
  picture: any = []
  getPicture: any = []
  imageArray: any = []
  pictureArray:any

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private activatedRoute: ActivatedRoute,
    private httpClient: HttpClient,
    private cookie: CookieService,
    private router: Router,
    private api: ApiService
  ) { }

  ngOnInit(): void {
    this.getData()
    this.onImageArray()
  }

  getData() {
    // this.getImage()
    this.api.apiGet("/company-work/view-byCompany/" + this.data)
      .then((res: any) => {
        console.log(res);
        let picture = res.data.data.picture;
        this.pictureArray = (picture.split(", "))
        console.log(this.pictureArray)
      })
  }

  // getImage(){
  //   this.api.apiGet("/file/testfile/" + this.data)
  //   .then((res:any)=>{
  //     console.log(res)
  //   })
  // }

  onFormdata() {
    let form = {
      name: ""
    }

    this.data.push(form)

    console.log(this.data)
  }

  onImageArray() {
    let form = {

    }
    this.imageArray.push(form)
    // console.log(this.imageArray)
  }

  changeImg(event: any) {
    this.image = <File>event.target.files;
    for (let i = 0; i < this.image.length; i++) {
      const imgRegister = new FileReader();
      imgRegister.readAsDataURL(this.image[i])
      imgRegister.onload = () => {
        this.picture.push(this.image)
        this.getPicture.push(imgRegister.result)
      }
      console.log(this.picture)
      console.log(this.getPicture)
    }
  }

  uploadimg() {
    const fileData = new FormData();
    console.log(this.picture);
    console.log(this.picture.length);
    for (let i = 0; i < this.picture.length; i++) {
      fileData.append('files', this.picture[i][0], this.picture[i][0].name);
    }
    this.api.apiPost("/file/test/" + this.data, fileData)
      .then((res: any) => {
        console.log(res);
      })
      .catch((error: any) => {
        console.log(error)
      })
  }

}
