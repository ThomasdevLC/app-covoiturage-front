import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateVehicleEditComponent } from './private-vehicle-edit.component';

describe('PrivateVehicleEditComponent', () => {
  let component: PrivateVehicleEditComponent;
  let fixture: ComponentFixture<PrivateVehicleEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrivateVehicleEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrivateVehicleEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
