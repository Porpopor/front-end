import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCompanyWorkComponent } from './edit-company-work.component';

describe('EditCompanyWorkComponent', () => {
  let component: EditCompanyWorkComponent;
  let fixture: ComponentFixture<EditCompanyWorkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCompanyWorkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCompanyWorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
