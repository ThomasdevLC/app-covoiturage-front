import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyVehicleAdminManagementComponent } from './company-vehicle-admin-management.component';

describe('CompanyVehicleAdminManagementComponent', () => {
  let component: CompanyVehicleAdminManagementComponent;
  let fixture: ComponentFixture<CompanyVehicleAdminManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompanyVehicleAdminManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyVehicleAdminManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
