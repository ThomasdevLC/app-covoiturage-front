import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyVehicleEmployeeItemComponent } from './company-vehicle-employee-item.component';

describe('CompanyVehicleEmployeeItemComponent', () => {
  let component: CompanyVehicleEmployeeItemComponent;
  let fixture: ComponentFixture<CompanyVehicleEmployeeItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompanyVehicleEmployeeItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyVehicleEmployeeItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
