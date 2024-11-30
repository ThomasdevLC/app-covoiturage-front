import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateVehicleListComponent } from './private-vehicle-list.component';

describe('PrivateVehicleListComponent', () => {
  let component: PrivateVehicleListComponent;
  let fixture: ComponentFixture<PrivateVehicleListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrivateVehicleListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrivateVehicleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
