import { TestBed } from '@angular/core/testing';
import { PrivateVehicleService } from './private-vehicle.service';

describe('PrivateVehicleService', () => {
  let service: PrivateVehicleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrivateVehicleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
