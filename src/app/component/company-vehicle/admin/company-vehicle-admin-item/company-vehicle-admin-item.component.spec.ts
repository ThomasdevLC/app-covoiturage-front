import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyVehicleAdminItemComponent } from './company-vehicle-admin-item.component';

describe('CompanyVehicleAdminItemComponent', () => {
  let component: CompanyVehicleAdminItemComponent;
  let fixture: ComponentFixture<CompanyVehicleAdminItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompanyVehicleAdminItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyVehicleAdminItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
