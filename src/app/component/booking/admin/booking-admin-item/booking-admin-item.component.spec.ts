import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingAdminItemComponent } from './booking-admin-item.component';

describe('BookingAdminItemComponent', () => {
  let component: BookingAdminItemComponent;
  let fixture: ComponentFixture<BookingAdminItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookingAdminItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookingAdminItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
