import { TestBed } from '@angular/core/testing';

import { RideshareOrganizerService } from './rideshare-organizer.service';

describe('RideshareOrganizerService', () => {
  let service: RideshareOrganizerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RideshareOrganizerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
