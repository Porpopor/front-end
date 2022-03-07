import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { ApiService } from 'src/app/service/api/api.service';

@Component({
  selector: 'app-create-company-work',
  templateUrl: './create-company-work.component.html',
  styleUrls: ['./create-company-work.component.css']
})
export class CreateCompanyWorkComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private activatedRoute: ActivatedRoute,
    private httpClient: HttpClient,
    private cookie: CookieService,
    private router: Router,
    private api: ApiService
  ) { }

  ngOnInit(): void {
  }

}
