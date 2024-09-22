import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingEmployeeCreateComponent } from './booking-employee-create.component';

describe('BookingEmployeeCreateComponent', () => {
  let component: BookingEmployeeCreateComponent;
  let fixture: ComponentFixture<BookingEmployeeCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookingEmployeeCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookingEmployeeCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
