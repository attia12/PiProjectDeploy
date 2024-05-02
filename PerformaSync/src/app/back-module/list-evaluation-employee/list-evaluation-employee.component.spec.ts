import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListEvaluationEmployeeComponent } from './list-evaluation-employee.component';

describe('ListEvaluationEmployeeComponent', () => {
  let component: ListEvaluationEmployeeComponent;
  let fixture: ComponentFixture<ListEvaluationEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListEvaluationEmployeeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListEvaluationEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
