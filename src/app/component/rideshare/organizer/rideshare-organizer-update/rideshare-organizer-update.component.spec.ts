import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RideshareOrganizerUpdateComponent } from './rideshare-organizer-update.component';

describe('RideshareOrganizerUpdateComponent', () => {
  let component: RideshareOrganizerUpdateComponent;
  let fixture: ComponentFixture<RideshareOrganizerUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RideshareOrganizerUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RideshareOrganizerUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
