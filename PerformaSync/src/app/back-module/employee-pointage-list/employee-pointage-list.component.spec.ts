import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeePointageListComponent } from './employee-pointage-list.component';

describe('EmployeePointageListComponent', () => {
  let component: EmployeePointageListComponent;
  let fixture: ComponentFixture<EmployeePointageListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeePointageListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmployeePointageListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
