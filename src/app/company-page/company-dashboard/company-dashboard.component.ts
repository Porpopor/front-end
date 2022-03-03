import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { environment } from 'src/environments/environment';
import { DashboardComponent } from '../dialog/dashboard/dashboard.component';

@Component({
  selector: 'app-company-dashboard',
  templateUrl: './company-dashboard.component.html',
  styleUrls: ['./company-dashboard.component.css']
})
export class CompanyDashboardComponent implements OnInit {

  id: any;

  companyWork: any =[];
  constructor(
    private activatedRoute: ActivatedRoute,
    private httpClient: HttpClient,
    private cookie: CookieService,
    private router: Router,
    private dialog:MatDialog
  ) { }

  ngOnInit(): void {
    this.getCompanyWork()
    // this.activatedRoute.params.subscribe(params => {
    //   this.id = params['id'];
    //   console.log(this.id);
    // })
  }

  getCompanyWork() {
    this.httpClient.get(`${environment.API_URL}/company-work/list-byCompany`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
      .subscribe((res: any) => {
        // console.log(res);
        this.companyWork = res.data.list;
      })
  }

  onEdit(id:any){
    this.dialog.open(DashboardComponent,{data: id})
  }

}
