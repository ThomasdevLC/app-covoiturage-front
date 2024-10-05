import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RideshareAddReservationComponent } from './rideshare-add-reservation.component';

describe('RideshareAddReservationComponent', () => {
  let component: RideshareAddReservationComponent;
  let fixture: ComponentFixture<RideshareAddReservationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RideshareAddReservationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RideshareAddReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
