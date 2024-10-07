import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RideshareReservationDetailsComponent } from './rideshare-reservation-details.component';

describe('RideshareReservationDetailsComponent', () => {
  let component: RideshareReservationDetailsComponent;
  let fixture: ComponentFixture<RideshareReservationDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RideshareReservationDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RideshareReservationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
