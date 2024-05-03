import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierTimeEntryComponent } from './modifier-time-entry.component';

describe('ModifierTimeEntryComponent', () => {
  let component: ModifierTimeEntryComponent;
  let fixture: ComponentFixture<ModifierTimeEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifierTimeEntryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModifierTimeEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
