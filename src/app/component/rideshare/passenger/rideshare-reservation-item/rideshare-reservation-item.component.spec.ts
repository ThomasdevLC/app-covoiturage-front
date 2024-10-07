import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RideshareReservationItemComponent } from './rideshare-reservation-item.component';

describe('RideshareReservationItemComponent', () => {
  let component: RideshareReservationItemComponent;
  let fixture: ComponentFixture<RideshareReservationItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RideshareReservationItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RideshareReservationItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
