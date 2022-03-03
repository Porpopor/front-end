import { TestBed } from '@angular/core/testing';

import { GuardCompanyService } from './guard-company.service';

describe('GuardCompanyService', () => {
  let service: GuardCompanyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GuardCompanyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
