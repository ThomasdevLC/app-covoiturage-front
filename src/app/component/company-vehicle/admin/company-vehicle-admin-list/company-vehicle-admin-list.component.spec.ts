import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyVehicleAdminListComponent } from './company-vehicle-admin-list.component';

describe('CompanyVehicleAdminListComponent', () => {
  let component: CompanyVehicleAdminListComponent;
  let fixture: ComponentFixture<CompanyVehicleAdminListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompanyVehicleAdminListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyVehicleAdminListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
