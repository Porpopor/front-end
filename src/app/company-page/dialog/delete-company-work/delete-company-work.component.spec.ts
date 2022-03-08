import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteCompanyWorkComponent } from './delete-company-work.component';

describe('DeleteCompanyWorkComponent', () => {
  let component: DeleteCompanyWorkComponent;
  let fixture: ComponentFixture<DeleteCompanyWorkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteCompanyWorkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteCompanyWorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
