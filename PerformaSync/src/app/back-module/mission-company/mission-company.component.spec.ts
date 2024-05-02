import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MissionCompanyComponent } from './mission-company.component';

describe('MissionCompanyComponent', () => {
  let component: MissionCompanyComponent;
  let fixture: ComponentFixture<MissionCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MissionCompanyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MissionCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
