import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyVehicleUpdateComponent } from './company-vehicle-update.component';

describe('CompanyVehicleUpdateComponent', () => {
  let component: CompanyVehicleUpdateComponent;
  let fixture: ComponentFixture<CompanyVehicleUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompanyVehicleUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyVehicleUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
