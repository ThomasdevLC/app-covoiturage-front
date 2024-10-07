import { TestBed } from '@angular/core/testing';

import { RidesharePassengerService } from './rideshare-passenger.service';

describe('RidesharePassengerService', () => {
  let service: RidesharePassengerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RidesharePassengerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
