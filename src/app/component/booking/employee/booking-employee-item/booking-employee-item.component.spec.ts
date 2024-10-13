import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingEmployeeItemComponent } from './booking-employee-item.component';

describe('BookingEmployeeItemComponent', () => {
  let component: BookingEmployeeItemComponent;
  let fixture: ComponentFixture<BookingEmployeeItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookingEmployeeItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookingEmployeeItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
