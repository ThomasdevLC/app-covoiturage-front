import { TestBed } from '@angular/core/testing';

import { BookingEmployeeService } from './booking-employee.service';

describe('BookingEmployeeService', () => {
  let service: BookingEmployeeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookingEmployeeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
