import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { ApiService } from 'src/app/service/api/api.service';
import { environment } from 'src/environments/environment';
import { DeleteCompanyWorkComponent } from '../dialog/delete-company-work/delete-company-work.component';
import { EditCompanyWorkComponent } from '../dialog/edit-company-work/edit-company-work.component';

@Component({
  selector: 'app-company-dashboard',
  templateUrl: './company-dashboard.component.html',
  styleUrls: ['./company-dashboard.component.css']
})
export class CompanyDashboardComponent implements OnInit {

  id: any;

  companyWork: any = [];
  constructor(
    private activatedRoute: ActivatedRoute,
    private httpClient: HttpClient,
    private cookie: CookieService,
    private router: Router,
    private dialog: MatDialog,
    private api: ApiService
  ) { }

  ngOnInit(): void {
    // console.log("1")
    //  await this.getTest()
    this.getCompanyWork()
    // console.log("3")
    console.log(this.companyWork);
    // this.activatedRoute.params.subscribe(params => {
    //   this.id = params['id'];
    //   console.log(this.id);
    // })
  }

  getCompanyWork() {
    // this.httpClient.get(`${environment.API_URL}/company-work/list-byCompany`, {
    //   headers: { Authorization: `Bearer ${this.cookie.get('token')}` }
    // })
    this.api.apiGet("/company-work/list-byCompany")
      .then((res: any) => {
        // console.log(res);
        this.companyWork = res.data.list;
      })
  }
  onView(id:any){
    this.router.navigate(['/company/view/' + id])
  }

  onEdit(id: any) {
    this.dialog.open(EditCompanyWorkComponent, { data: id })
  }

  onDelete(id: any) {
    this.dialog.open(DeleteCompanyWorkComponent, { data: id })
  }

}
