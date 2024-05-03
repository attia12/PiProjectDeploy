import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingsystemComponent } from './ratingsystem.component';

describe('RatingsystemComponent', () => {
  let component: RatingsystemComponent;
  let fixture: ComponentFixture<RatingsystemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RatingsystemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RatingsystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
