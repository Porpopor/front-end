import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyWorkComponent } from './company-work.component';

describe('CompanyWorkComponent', () => {
  let component: CompanyWorkComponent;
  let fixture: ComponentFixture<CompanyWorkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyWorkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyWorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
