import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RidesharePassengerItemComponent } from './rideshare-passenger-item.component';

describe('RidesharePassengerItemComponent', () => {
  let component: RidesharePassengerItemComponent;
  let fixture: ComponentFixture<RidesharePassengerItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RidesharePassengerItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RidesharePassengerItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
