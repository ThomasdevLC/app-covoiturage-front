import { TestBed } from '@angular/core/testing';

import { CompanyVehicleEmployeeService } from './company-vehicle-employee.service';

describe('CompanyVehicleEmployeeService', () => {
  let service: CompanyVehicleEmployeeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompanyVehicleEmployeeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
