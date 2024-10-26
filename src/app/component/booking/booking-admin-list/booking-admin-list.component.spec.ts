import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingAdminListComponent } from './booking-admin-list.component';

describe('BookingAdminListComponent', () => {
  let component: BookingAdminListComponent;
  let fixture: ComponentFixture<BookingAdminListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookingAdminListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookingAdminListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
