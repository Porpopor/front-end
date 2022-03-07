import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCompanyWorkComponent } from './create-company-work.component';

describe('CreateCompanyWorkComponent', () => {
  let component: CreateCompanyWorkComponent;
  let fixture: ComponentFixture<CreateCompanyWorkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateCompanyWorkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCompanyWorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
