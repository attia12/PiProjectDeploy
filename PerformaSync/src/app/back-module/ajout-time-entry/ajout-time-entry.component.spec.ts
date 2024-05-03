import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutTimeEntryComponent } from './ajout-time-entry.component';

describe('AjoutTimeEntryComponent', () => {
  let component: AjoutTimeEntryComponent;
  let fixture: ComponentFixture<AjoutTimeEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjoutTimeEntryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AjoutTimeEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
