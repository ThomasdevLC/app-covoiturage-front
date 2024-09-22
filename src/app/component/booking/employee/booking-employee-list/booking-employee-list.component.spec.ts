import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingEmployeeListComponent } from './booking-employee-list.component';

describe('BookingEmployeeListComponent', () => {
  let component: BookingEmployeeListComponent;
  let fixture: ComponentFixture<BookingEmployeeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookingEmployeeListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookingEmployeeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
