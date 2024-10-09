import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RidesharePassengerSearchListComponent } from './rideshare-passenger-search-list.component';

describe('RidesharePassengerSearchListComponent', () => {
  let component: RidesharePassengerSearchListComponent;
  let fixture: ComponentFixture<RidesharePassengerSearchListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RidesharePassengerSearchListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RidesharePassengerSearchListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
