import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RidesharesListComponent } from './rideshares-list.component';

describe('RidesharesListComponent', () => {
  let component: RidesharesListComponent;
  let fixture: ComponentFixture<RidesharesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RidesharesListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RidesharesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
