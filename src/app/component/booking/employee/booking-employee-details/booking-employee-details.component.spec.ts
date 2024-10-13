import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingEmployeeDetailsComponent } from './booking-employee-details.component';

describe('BookingEmployeeDetailsComponent', () => {
  let component: BookingEmployeeDetailsComponent;
  let fixture: ComponentFixture<BookingEmployeeDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookingEmployeeDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookingEmployeeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
