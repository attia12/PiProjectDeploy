import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterLettreComponent } from './ajouter-lettre.component';

describe('AjouterLettreComponent', () => {
  let component: AjouterLettreComponent;
  let fixture: ComponentFixture<AjouterLettreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjouterLettreComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AjouterLettreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
