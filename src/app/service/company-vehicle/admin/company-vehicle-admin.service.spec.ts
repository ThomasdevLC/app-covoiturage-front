import { TestBed } from '@angular/core/testing';

import { CompanyVehicleAdminService } from './company-vehicle-admin.service';

describe('CompanyVehicleAdminService', () => {
  let service: CompanyVehicleAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompanyVehicleAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
