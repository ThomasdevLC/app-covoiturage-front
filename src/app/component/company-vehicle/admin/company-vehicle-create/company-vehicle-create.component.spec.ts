import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyVehicleCreateComponent } from './company-vehicle-create.component';

describe('CompanyVehicleCreateComponent', () => {
  let component: CompanyVehicleCreateComponent;
  let fixture: ComponentFixture<CompanyVehicleCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompanyVehicleCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyVehicleCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
