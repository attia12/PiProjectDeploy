import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveJobComponent } from './active-job.component';

describe('ActiveJobComponent', () => {
  let component: ActiveJobComponent;
  let fixture: ComponentFixture<ActiveJobComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActiveJobComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ActiveJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
