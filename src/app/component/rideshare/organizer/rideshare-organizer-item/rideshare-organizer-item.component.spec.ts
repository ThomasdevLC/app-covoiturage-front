import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RideshareOrganizerItemComponent } from './rideshare-organizer-item.component';

describe('RideshareOrganizerItemComponent', () => {
  let component: RideshareOrganizerItemComponent;
  let fixture: ComponentFixture<RideshareOrganizerItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RideshareOrganizerItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RideshareOrganizerItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
