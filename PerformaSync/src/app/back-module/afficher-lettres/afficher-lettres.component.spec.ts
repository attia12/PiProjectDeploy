import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfficherLettresComponent } from './afficher-lettres.component';

describe('AfficherLettresComponent', () => {
  let component: AfficherLettresComponent;
  let fixture: ComponentFixture<AfficherLettresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AfficherLettresComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AfficherLettresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
