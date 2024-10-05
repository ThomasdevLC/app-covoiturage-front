import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RideshareOrganizerListComponent } from './rideshare-organizer-list.component';

describe('RideshareOrganizerListComponent', () => {
  let component: RideshareOrganizerListComponent;
  let fixture: ComponentFixture<RideshareOrganizerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RideshareOrganizerListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RideshareOrganizerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
