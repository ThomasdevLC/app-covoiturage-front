import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RideshareDetailComponent } from './rideshare-detail.component';

describe('RideshareDetailComponent', () => {
  let component: RideshareDetailComponent;
  let fixture: ComponentFixture<RideshareDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RideshareDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RideshareDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
