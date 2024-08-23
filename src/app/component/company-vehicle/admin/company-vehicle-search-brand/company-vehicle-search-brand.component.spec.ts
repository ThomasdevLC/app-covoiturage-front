import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyVehicleSearchBrandComponent } from './company-vehicle-search-brand.component';

describe('CompanyVehicleSearchBrandComponent', () => {
  let component: CompanyVehicleSearchBrandComponent;
  let fixture: ComponentFixture<CompanyVehicleSearchBrandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompanyVehicleSearchBrandComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyVehicleSearchBrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
