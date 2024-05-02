import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutEvaluationComponent } from './ajout-evaluation.component';

describe('AjoutEvaluationComponent', () => {
  let component: AjoutEvaluationComponent;
  let fixture: ComponentFixture<AjoutEvaluationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjoutEvaluationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AjoutEvaluationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
