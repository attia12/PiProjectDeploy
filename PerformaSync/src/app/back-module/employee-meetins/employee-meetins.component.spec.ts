import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeMeetinsComponent } from './employee-meetins.component';

describe('EmployeeMeetinsComponent', () => {
  let component: EmployeeMeetinsComponent;
  let fixture: ComponentFixture<EmployeeMeetinsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeMeetinsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmployeeMeetinsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
