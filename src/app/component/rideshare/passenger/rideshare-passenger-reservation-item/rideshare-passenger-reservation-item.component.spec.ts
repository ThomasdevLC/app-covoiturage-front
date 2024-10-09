import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RidesharePassengerReservationItemComponent } from './rideshare-passenger-reservation-item.component';

describe('RidesharePassengerReservationItemComponent', () => {
  let component: RidesharePassengerReservationItemComponent;
  let fixture: ComponentFixture<RidesharePassengerReservationItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RidesharePassengerReservationItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RidesharePassengerReservationItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
