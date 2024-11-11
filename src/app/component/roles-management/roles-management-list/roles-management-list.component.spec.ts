import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolesManagementListComponent } from './roles-management-list.component';

describe('RolesManagementListComponent', () => {
  let component: RolesManagementListComponent;
  let fixture: ComponentFixture<RolesManagementListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RolesManagementListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RolesManagementListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
