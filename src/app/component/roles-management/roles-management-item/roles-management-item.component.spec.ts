import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolesManagementItemComponent } from './roles-management-item.component';

describe('RolesManagementItemComponent', () => {
  let component: RolesManagementItemComponent;
  let fixture: ComponentFixture<RolesManagementItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RolesManagementItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RolesManagementItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
