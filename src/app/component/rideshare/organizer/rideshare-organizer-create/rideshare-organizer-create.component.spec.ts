import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RideshareOrganizerCreateComponent } from './rideshare-organizer-create.component';

describe('RideshareOrganizerCreateComponent', () => {
  let component: RideshareOrganizerCreateComponent;
  let fixture: ComponentFixture<RideshareOrganizerCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RideshareOrganizerCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RideshareOrganizerCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
