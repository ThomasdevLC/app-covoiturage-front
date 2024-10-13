import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RideshareOrganizerDetailsComponent } from './rideshare-organizer-details.component';

describe('RideshareOrganizerDetailsComponent', () => {
  let component: RideshareOrganizerDetailsComponent;
  let fixture: ComponentFixture<RideshareOrganizerDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RideshareOrganizerDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RideshareOrganizerDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
