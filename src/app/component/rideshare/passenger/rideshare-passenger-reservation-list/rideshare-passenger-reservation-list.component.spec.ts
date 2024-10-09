import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RidesharePassengerReservationListComponent } from './rideshare-passenger-reservation-list.component';

describe('RidesharePassengerReservationListComponent', () => {
  let component: RidesharePassengerReservationListComponent;
  let fixture: ComponentFixture<RidesharePassengerReservationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RidesharePassengerReservationListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RidesharePassengerReservationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
