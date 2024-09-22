import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingEmployeeUpdateComponent } from './booking-employee-update.component';

describe('BookingEmployeeUpdateComponent', () => {
  let component: BookingEmployeeUpdateComponent;
  let fixture: ComponentFixture<BookingEmployeeUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookingEmployeeUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookingEmployeeUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
