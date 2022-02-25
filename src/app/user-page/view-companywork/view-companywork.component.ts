import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-companywork',
  templateUrl: './view-companywork.component.html',
  styleUrls: ['./view-companywork.component.css']
})
export class ViewCompanyworkComponent implements OnInit {

  id: string | undefined;
  constructor(
    private activateRoute: ActivatedRoute,

  ) { }

  ngOnInit(): void {
    this.activateRoute.params.subscribe(params => {
      this.id = params['id'];
      console.log(this.id);
    })
  }

}
