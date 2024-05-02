import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendcontractComponent } from './sendcontract.component';

describe('SendcontractComponent', () => {
  let component: SendcontractComponent;
  let fixture: ComponentFixture<SendcontractComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SendcontractComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SendcontractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
