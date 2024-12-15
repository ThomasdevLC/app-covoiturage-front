import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateVehicleItemComponent } from './private-vehicle-item.component';

describe('PrivateVehicleItemComponent', () => {
  let component: PrivateVehicleItemComponent;
  let fixture: ComponentFixture<PrivateVehicleItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrivateVehicleItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrivateVehicleItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
