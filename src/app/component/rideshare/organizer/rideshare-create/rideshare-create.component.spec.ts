import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RideshareCreateComponent } from './rideshare-create.component';

describe('RideshareCreateComponent', () => {
  let component: RideshareCreateComponent;
  let fixture: ComponentFixture<RideshareCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RideshareCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RideshareCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
