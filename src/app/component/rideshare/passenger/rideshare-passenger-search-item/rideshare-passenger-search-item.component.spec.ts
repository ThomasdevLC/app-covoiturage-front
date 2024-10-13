import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RidesharePassengerSearchItemComponent } from './rideshare-passenger-search-item.component';

describe('RidesharePassengerSearchItemComponent', () => {
  let component: RidesharePassengerSearchItemComponent;
  let fixture: ComponentFixture<RidesharePassengerSearchItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RidesharePassengerSearchItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RidesharePassengerSearchItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
