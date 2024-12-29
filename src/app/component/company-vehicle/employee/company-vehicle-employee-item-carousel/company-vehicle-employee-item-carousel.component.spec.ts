import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyVehicleEmployeeItemCarouselComponent } from './company-vehicle-employee-item-carousel.component';

describe('CompanyVehicleEmployeeItemCarouselComponent', () => {
  let component: CompanyVehicleEmployeeItemCarouselComponent;
  let fixture: ComponentFixture<CompanyVehicleEmployeeItemCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompanyVehicleEmployeeItemCarouselComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyVehicleEmployeeItemCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
