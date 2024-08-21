import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyVehicleEmployeeListComponent } from './company-vehicle-employee-list.component';

describe('CompanyVehicleEmployeeListComponent', () => {
  let component: CompanyVehicleEmployeeListComponent;
  let fixture: ComponentFixture<CompanyVehicleEmployeeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompanyVehicleEmployeeListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyVehicleEmployeeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
