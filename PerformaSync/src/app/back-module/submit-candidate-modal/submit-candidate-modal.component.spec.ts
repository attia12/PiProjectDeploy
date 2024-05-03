import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitCandidateModalComponent } from './submit-candidate-modal.component';

describe('SubmitCandidateModalComponent', () => {
  let component: SubmitCandidateModalComponent;
  let fixture: ComponentFixture<SubmitCandidateModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubmitCandidateModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubmitCandidateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
