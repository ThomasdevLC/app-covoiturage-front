import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateVehicleCreateComponent } from './private-vehicle-create.component';

describe('PrivateVehicleCreateComponent', () => {
  let component: PrivateVehicleCreateComponent;
  let fixture: ComponentFixture<PrivateVehicleCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrivateVehicleCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrivateVehicleCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
