import { TestBed } from '@angular/core/testing';

import { RideshareService } from './rideshare.service';

describe('RideshareService', () => {
  let service: RideshareService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RideshareService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
