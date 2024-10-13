import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RidesharePassengerReservationAddComponent } from './rideshare-passenger-reservation-add.component';

describe('RidesharePassengerReservationAddComponent', () => {
  let component: RidesharePassengerReservationAddComponent;
  let fixture: ComponentFixture<RidesharePassengerReservationAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RidesharePassengerReservationAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RidesharePassengerReservationAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
