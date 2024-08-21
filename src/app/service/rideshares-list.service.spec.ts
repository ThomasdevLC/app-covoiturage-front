import { TestBed } from '@angular/core/testing';

import { RidesharesListService } from './rideshares-list.service';

describe('RidesharesListService', () => {
  let service: RidesharesListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RidesharesListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
