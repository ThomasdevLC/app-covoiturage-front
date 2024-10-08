import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RidesharePassengerReservationDetailsComponent } from './rideshare-passenger-reservation-details';

describe('RideshareReservationDetailsComponent', () => {
  let component: RidesharePassengerReservationDetailsComponent;
  let fixture: ComponentFixture<RidesharePassengerReservationDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RidesharePassengerReservationDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RidesharePassengerReservationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
