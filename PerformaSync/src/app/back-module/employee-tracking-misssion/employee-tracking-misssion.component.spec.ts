import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeTrackingMisssionComponent } from './employee-tracking-misssion.component';

describe('EmployeeTrackingMisssionComponent', () => {
  let component: EmployeeTrackingMisssionComponent;
  let fixture: ComponentFixture<EmployeeTrackingMisssionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeTrackingMisssionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmployeeTrackingMisssionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
