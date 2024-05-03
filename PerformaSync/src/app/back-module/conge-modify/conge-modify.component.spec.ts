import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CongeModifyComponent } from './conge-modify.component';

describe('CongeModifyComponent', () => {
  let component: CongeModifyComponent;
  let fixture: ComponentFixture<CongeModifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CongeModifyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CongeModifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
