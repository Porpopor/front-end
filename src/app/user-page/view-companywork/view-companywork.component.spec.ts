import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCompanyworkComponent } from './view-companywork.component';

describe('ViewCompanyworkComponent', () => {
  let component: ViewCompanyworkComponent;
  let fixture: ComponentFixture<ViewCompanyworkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewCompanyworkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCompanyworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
