import { TestBed } from '@angular/core/testing';

import { BookingAdminServiceService } from './booking-admin.service';

describe('BookingAdminServiceService', () => {
  let service: BookingAdminServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookingAdminServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
