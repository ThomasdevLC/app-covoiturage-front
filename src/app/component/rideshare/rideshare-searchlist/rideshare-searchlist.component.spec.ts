import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RideshareSearchlistComponent } from './rideshare-searchlist.component';

describe('RideshareSearchlistComponent', () => {
  let component: RideshareSearchlistComponent;
  let fixture: ComponentFixture<RideshareSearchlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RideshareSearchlistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RideshareSearchlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
