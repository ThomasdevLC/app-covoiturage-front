import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RideshareReservationListComponent } from './rideshare-reservation-list.component';

describe('RideshareReservationListComponent', () => {
  let component: RideshareReservationListComponent;
  let fixture: ComponentFixture<RideshareReservationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RideshareReservationListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RideshareReservationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
